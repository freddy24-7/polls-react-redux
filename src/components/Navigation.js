import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import Button from "./Button";

const Navigation = ({ selectedUser, avatar, userId, handleLogout }) => {

    console.log(avatar);
    console.log(userId);
    console.log(selectedUser);

    if (!userId) {
        return null;
    }

    return (
        <nav className="base">
            <ul className="nav">
                <li className="links">
                    <NavLink to="/home" className="nav-link">
                        Home
                    </NavLink>
                </li>
                <li className="links">
                    <NavLink to="/leaderboard" className="nav-link">
                        Leaderboard
                    </NavLink>
                </li>
                <li className="links">
                    <NavLink to="/new" className="new">
                        New
                    </NavLink>
                </li>
                <li>
                    <img className="avatar" src={avatar} alt="avatar" />
                    <span className="user-id">{userId}</span>
                </li>
                <li className="links">
                    <NavLink to="/">
                        <Button onClick={handleLogout}>Logout</Button>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
