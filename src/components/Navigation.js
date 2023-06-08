import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import Logout from "./Logout";

const Navigation = () => {
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
                <li className="links">
                    <NavLink to="/" >
                        <Logout />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
