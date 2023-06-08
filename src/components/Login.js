import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../_DATA';
import './Login.css';
import Button from './Button';
import Card from './Card';

const Login = () => {
    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (selectedUser && password) {
            const user = users[selectedUser];

            if (user && user.password === password) {
                console.log('Logged in as:', user.name);

                navigate('/home');
            } else {
                setErrorMessage('Invalid password');
            }
        } else {
            setErrorMessage('Please select a user and enter a password');
        }
    };

    return (
        <section className="base">
        <div className="container">
            <Card>
                <h2>Login Employee Polls</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Select User:
                        <select value={selectedUser} onChange={handleUserChange}>
                            <option value="">Select a user</option>
                            {Object.values(users).map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <Button type="submit">Log in</Button>
                </form>
            </Card>
        </div>
        </section>
    );
};

export default Login;
