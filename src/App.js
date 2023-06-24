import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react';
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

function App(props) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useLocalStorage('avatar', '');
  const [userId, setUserId] = useLocalStorage('userId', '');
  const dispatch = useDispatch();

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
    dispatch(logoutUser());
    dispatch(resetState());
    setUserId('');
    setAvatar('');
    setSelectedUser('');
    setPassword('');
    setErrorMessage('');
    localStorage.clear();
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
          {userId && <Route path="/home" element={<Dashboard />} />}
          {userId && <Route path="/leaderboard" element={<LeaderBoard />} />}
          {userId && (
            <Route path="/questions/:question_id" element={<Questions />} />
          )}
          {userId && <Route path="/add" element={<NewQuestion />} />}
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
