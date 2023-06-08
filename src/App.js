import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import {Fragment, useState} from "react";
import {users} from "./_DATA";
import Navigation from "./components/Navigation";

function App() {

    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [avatar, setAvatar] = useState('');
    const [userId, setUserId] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (selectedUser && password) {
            const user = users[selectedUser];

            if (user && user.password === password) {
                setAvatar(user.avatarURL)
                setUserId(user.id)
                console.log('Logged in as:', user.name);
                console.log('id:', user.id);
                console.log('Avatar:', user.avatarURL);
                navigate('/home');
            } else {
                setErrorMessage('Invalid password');
            }
        } else {
            setErrorMessage('Please select a user and enter a password');
        }
    };

    const handleLogout = () => {
        setSelectedUser('');
        setPassword('');
        setErrorMessage('');
        setAvatar('');
        setUserId('');
        navigate('/');
    };

    return (

        <Fragment>
            <Navigation
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                avatar={avatar}
                userId={userId}
                handleLogout={handleLogout}
            />
        <Routes>
            <Route path="/" element={<Login
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            password={password}
            setPassword={setPassword}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            handleLogin={handleLogin}
            />}
            />
            <Route path="/home" element={<Dashboard
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            avatar={avatar}
            userId={userId}
            />} />
        </Routes>
        </Fragment>
    );
}

export default App;