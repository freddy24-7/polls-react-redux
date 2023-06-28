import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { users } from './utils/_DATA';
import Navigation from './components/Navigation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { connect, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LeaderBoard from './components/LeaderBoard';
import Questions from './components/Questions';
import NewQuestion from './components/NewQuestion';
import NotFound from './components/NotFound';
import { resetState } from './redux/index';
import { logoutUser } from './redux/authedUserSlice';
import { useDispatch } from 'react-redux';
import Protected from './utils/Protected';
import { saveQuestionAnswer } from './utils/api';

function App(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useLocalStorage('avatar', '');
  const [userId, setUserId] = useLocalStorage('userId', '');
  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve the last user from local storage
    const lastUser = localStorage.getItem('lastUser');
    if (lastUser) {
      setSelectedUser(lastUser);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const lastURL = localStorage.getItem('lastURL');
    const lastUser = localStorage.getItem('lastUser');
    const user = users[selectedUser];

    if (selectedUser && password) {
      if (user && user.password === password) {
        setAvatar(user.avatarURL);
        setUserId(user.id);

        if (selectedUser === lastUser) {
          if (lastURL && typeof lastURL === 'string') {
            const exceptions = [
              '/questions/8xf0y6ziyjabvozdd253nd',
              '/questions/6ni6ok3ym7mf1p33lnez',
              '/questions/am8ehyc8byjqgar0jgpub9',
              '/questions/loxhs1bqm25b708cmbf3g',
              '/questions/vthrdm985a262al8qx3do',
              '/questions/xj352vofupe1dqz9emx13r',
            ];

            if (exceptions.includes(lastURL)) {
              navigate(lastURL, { replace: true });
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

  const handleLogout = () => {
    // Check if the items exist in local storage
    if (localStorage.getItem('lastUser') && localStorage.getItem('lastURL')) {
      localStorage.clear();
    }
    localStorage.setItem('lastUser', userId);
    localStorage.setItem('lastURL', window.location.pathname);
    dispatch(logoutUser());
    // dispatch(resetState());
    setUserId('');
    setAvatar('');
    setSelectedUser('');
    setPassword('');
    setErrorMessage('');
    navigate('/');
  };

  useEffect(() => {
    const path = location.pathname;
    const questionPath = path.startsWith('/questions/')
      ? location.pathname
      : '';
    const accessedByTyping = ['/add', '/leaderboard', '/home'].includes(path);
    handleLogout();
    navigate('/');
    const validPaths = ['/add', '/leaderboard', '/home'];
    if (validPaths.includes(path) && accessedByTyping) {
      localStorage.setItem('lastURL', path);
    } else {
      localStorage.removeItem('lastURL');
    }
    if (questionPath) {
      localStorage.setItem('lastURL', questionPath);
    }
  }, [dispatch]);

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
