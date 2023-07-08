import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { users } from './utils/_DATA';
import Navigation from './components/Navigation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LeaderBoard from './components/LeaderBoard';
import Questions from './components/Questions';
import NewQuestion from './components/NewQuestion';
import NotFound from './components/NotFound';
import { logoutUser } from './redux/authedUserSlice';
import { useDispatch } from 'react-redux';
import Protected from './utils/Protected';

function App(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useLocalStorage('avatar', '');
  const [userId, setUserId] = useLocalStorage('userId', '');
  const dispatch = useDispatch();
  const [lastURL, setLastURL] = useState('');
  const specificRoutes = [
    '/questions/8xf0y6ziyjabvozdd253nd',
    '/questions/6ni6ok3ym7mf1p33lnez',
    '/questions/am8ehyc8byjqgar0jgpub9',
    '/questions/loxhs1bqm25b708cmbf3g',
    '/questions/vthrdm985a262al8qx3do',
    '/questions/xj352vofupe1dqz9emx13r',
  ];

  //Handling last user and last URL
  useEffect(() => {
    // Retrieve the last user from local storage
    const lastUser = localStorage.getItem('lastUser');
    if (lastUser) {
      setSelectedUser(lastUser);
    }
    // Retrieve the last URL from local storage
    const storedLastURL = localStorage.getItem('lastURL');
    if (storedLastURL) {
      setLastURL(storedLastURL);
      localStorage.removeItem('lastURL');
    }
  }, []);

  //Updating lastURL when the URL changes
  useEffect(() => {
    setLastURL(location.pathname);
  }, [location]);

  //Handling login
  const handleLogin = (e) => {
    e.preventDefault();
    // Retrieve the last URL from local storage
    const lastURL = localStorage.getItem('lastURL');
    const lastUser = localStorage.getItem('lastUser');
    const user = users[selectedUser];
    console.log(lastURL);
    console.log(typeof lastURL);
    console.log(lastUser);
    console.log(user);
    console.log(selectedUser);

    if (selectedUser && password) {
      if (user && user.password === password) {
        setAvatar(user.avatarURL);
        setUserId(user.id);

        if (selectedUser === lastUser) {
          if (lastURL && typeof lastURL === 'string') {
            if (specificRoutes.includes(lastURL)) {
              navigate(lastURL, { replace: true });
              return;
            } else if (lastURL.startsWith('/questions/')) {
              navigate('/404');
            } else {
              navigate(lastURL, { replace: true });
            }
          } else {
            navigate('/home', { replace: true });
          }
        } else {
          navigate('/home', { replace: true });
        }
      } else {
        setErrorMessage('Invalid password');
      }
    } else {
      setErrorMessage('Please select a user and enter a password');
    }
  };

  //Handling logout
  const handleLogout = useCallback(() => {
    // Clear lastURL from local storage
    localStorage.removeItem('lastURL');
    // Store lastUser and current URL in local storage
    localStorage.setItem('lastUser', userId);
    localStorage.setItem('lastURL', window.location.pathname);
    // Remove userId from local storage
    localStorage.removeItem('userId');
    dispatch(logoutUser());
    setUserId('');
    setAvatar('');
    setSelectedUser('');
    setPassword('');
    setErrorMessage('');
    navigate('/');
  }, [
    dispatch,
    navigate,
    userId,
    setUserId,
    setAvatar,
    setSelectedUser,
    setPassword,
  ]);

  //Handling user generated URL browser actions (from this point to return statement)
  useEffect(() => {
    const path = lastURL || location.pathname;
    const validPaths = ['/add', '/leaderboard', '/home'];

    if (validPaths.includes(path)) {
      localStorage.setItem('lastURL', path);
    } else if (specificRoutes.includes(path)) {
      localStorage.setItem('lastURL', path);
    } else if (
      path.startsWith('/questions/') &&
      !specificRoutes.includes(path)
    ) {
      localStorage.setItem('lastURL', path);
    } else {
      localStorage.removeItem('lastURL');
    }
  }, []);

  const handlePathChange = () => {
    const path = window.location.pathname; // Get the updated path value
    console.log(path);
    if (
      path === '/add' ||
      path === '/leaderboard' ||
      path.startsWith('/questions')
    ) {
      handleLogout();
    }
  };

  const handleBeforeUnload = () => {
    const path = window.location.pathname;
    if (
      path === '/add' ||
      path === '/leaderboard' ||
      path.startsWith('/questions')
    ) {
      console.log(path);
    }
  };

  useEffect(() => {
    handlePathChange();
    console.log('code ran');
    window.addEventListener('hashchange', handlePathChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('hashchange', handlePathChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Fragment>
      {/* Navigation component */}
      <Navigation
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        avatar={avatar}
        userId={userId}
        handleLogout={handleLogout}
      />
      <div>
        {/* Display loading bar if loading */}
        {props.loading === true ? (
          <LoadingBar style={{ backgroundColor: '#85715d' }} />
        ) : null}{' '}
        <Routes>
          <Route
            path="/"
            element={
              <Login
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                password={password}
                setPassword={setPassword}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                handleLogin={handleLogin}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Protected userId={userId}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <Protected userId={userId}>
                <LeaderBoard />
              </Protected>
            }
          />
          <Route
            path="/questions/:question_id"
            element={
              <Protected userId={userId}>
                <Questions />
              </Protected>
            }
          />
          <Route
            path="/add"
            element={
              <Protected userId={userId}>
                <NewQuestion />
              </Protected>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/404"
            element={<NotFound handleLogout={handleLogout} />}
          />
        </Routes>
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
