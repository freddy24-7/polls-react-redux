import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "./Button";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <Button onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default Logout;