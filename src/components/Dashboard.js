import React from 'react';
import './Dashboard.css';

// Dashboard component
const Dashboard = ({ selectedUser, avatar, userId }) => {

    return (
        <div className="dashboard-container">
            {/* Navigation component */}
            {/* Commented out: <Navigation /> */}
            <h2>Welcome {selectedUser}</h2>
            {/* Displaying avatar */}
            <img src={avatar} alt="avatar" />
        </div>
    );
};

export default Dashboard;
