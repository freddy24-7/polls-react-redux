import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
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
import { resetState } from './redux/index';
import { logoutUser } from './redux/authedUserSlice';
import { useDispatch } from 'react-redux';
import Protected from './utils/Protected';

function App(props) {
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

    if (selectedUser && password) {
      const user = users[selectedUser];

      if (user && user.password === password) {
        setAvatar(user.avatarURL);
        setUserId(user.id);

        // Retrieve the last URL from local storage
        const lastURL = localStorage.getItem('lastURL');
        if (lastURL) {
          navigate(lastURL, { replace: true });
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
    localStorage.setItem('lastUser', userId);
    localStorage.setItem('lastURL', window.location.pathname);
    dispatch(logoutUser());
    dispatch(resetState());
    setUserId('');
    setAvatar('');
    setSelectedUser('');
    setPassword('');
    setErrorMessage('');
    // Check if the items exist in local storage
    if (localStorage.getItem('lastUser') && localStorage.getItem('lastURL')) {
      // Get the values of the items
      const lastUserValue = localStorage.getItem('lastUser');
      const lastURLValue = localStorage.getItem('lastURL');
      // Clear all items from local storage
      localStorage.clear();
      // Set the items back to local storage
      localStorage.setItem('lastUser', lastUserValue);
      localStorage.setItem('lastURL', lastURLValue);
    }
    navigate('/');
  };

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
