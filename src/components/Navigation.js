import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';
import Button from './Button';

const Navigation = ({ avatar, userId, handleLogout }) => {
  const location = useLocation();
  const isNotFoundPage = location.pathname === '/404';

  if (!userId) {
    return null;
  }

  return (
    <nav className="base fixed">
      <ul className="nav">
        {isNotFoundPage ? (
          <li className="links">
            <NavLink to="/home" className="nav-link">
              Home
            </NavLink>
          </li>
        ) : (
          <>
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
              <NavLink to="/add" className="new">
                Add Question
              </NavLink>
            </li>
            <li className="links">
              <NavLink to="/">
                <Button onClick={handleLogout}>Logout</Button>
              </NavLink>
            </li>
          </>
        )}
        <li>
          <img className="avatar" src={avatar} alt="avatar" />
          <span className="user-id">{userId}</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
