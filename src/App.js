import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { users } from './utils/_DATA';
import Navigation from './components/Navigation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { logoutUser } from './actions/authedUser';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LeaderBoard from './components/LeaderBoard';

function App(props) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useLocalStorage('selectedUser', '');
  const [password, setPassword] = useLocalStorage('password', '');
  const [avatar, setAvatar] = useLocalStorage('avatar', '');
  const [userId, setUserId] = useLocalStorage('userId', '');

  const handleLogin = (e) => {
    e.preventDefault();

    if (selectedUser && password) {
      const user = users[selectedUser];

      if (user && user.password === password) {
        setAvatar(user.avatarURL);
        setUserId(user.id);
        navigate('/home', { replace: true });
      } else {
        setErrorMessage('Invalid password');
      }
    } else {
      setErrorMessage('Please select a user and enter a password');
    }
  };

  const handleLogout = () => {
    props.dispatch(logoutUser());
    setUserId('');
    setAvatar('');
    setSelectedUser('');
    setPassword('');
    setErrorMessage('');
    localStorage.removeItem('selectedUser');
    localStorage.removeItem('password');
    localStorage.removeItem('avatar');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const loggedIn = JSON.parse(localStorage.getItem('userId'));

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
          {/* Route for Login component */}
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
          {/* Route for Dashboard component */}
          {loggedIn ? (
            <Route path="/home" element={<Dashboard />} />
          ) : (
            <Route path="/" />
          )}
          {loggedIn ? (
            <Route path="/leaderboard" element={<LeaderBoard />} />
          ) : (
            <Route path="/" />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
