import React from 'react';
import './Dashboard.css';

const Dashboard = ( {selectedUser, avatar, userId} ) => {

    console.log(avatar);
    console.log(userId);
    console.log(selectedUser);

    return (

    <div className="dashboard-container">
            {/*<Navigation />*/}
            <h2>Welcome {selectedUser}</h2>
        {/*display avatar here*/}
        <img src={avatar} alt="avatar" />
        </div>
    );
};

export default Dashboard;