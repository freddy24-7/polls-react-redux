import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import {Fragment, useState, useEffect} from "react";
import {users} from "./utils/_DATA";
import Navigation from "./components/Navigation";
import {useLocalStorage} from "./hooks/useLocalStorage";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";

function App(props) {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [selectedUser, setSelectedUser] = useLocalStorage("selectedUser", "");
    const [password, setPassword] = useLocalStorage("password", "");
    const [avatar, setAvatar] = useLocalStorage("avatar", "");
    const [userId, setUserId] = useLocalStorage("userId", "");
    const [initialRender, setInitialRender] = useState(true);

    const handleLogin = (e) => {
        e.preventDefault();

        if (selectedUser && password) {
            const user = users[selectedUser];

            if (user && user.password === password) {
                setAvatar(user.avatarURL)
                setUserId(user.id)
                navigate('/home');
            } else {
                setErrorMessage('Invalid password');
            }
        } else {
            setErrorMessage('Please select a user and enter a password');
        }
    };

    const handleLogout = () => {
        setUserId('')
        setAvatar('')
        setSelectedUser('')
        setPassword('')
        setErrorMessage('')
        localStorage.removeItem("selectedUser");
        localStorage.removeItem("password");
        localStorage.removeItem("avatar");
        localStorage.removeItem("userId");
        navigate('/');
    };

    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
            return;
        }

        const innerFunction = handleInitialData();
        innerFunction(props.dispatch).then(r => console.log("handleInitialData"));
    }, [initialRender, props.dispatch]);

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

export default connect()(App);