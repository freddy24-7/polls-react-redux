import React from 'react';
import './Dashboard.css';

// Dashboard component
const Dashboard = ({ selectedUser, avatar, userId }) => {

    // Logging the values of avatar, userId, and selectedUser
    console.log(avatar);
    console.log(userId);
    console.log(selectedUser);

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
