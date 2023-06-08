import React from 'react';
import Navigation from "./Navigation";
import './Dashboard.css';
import {users} from "../_DATA";

const Dashboard = () => {

    return (
        <div className="dashboard-container">
            <Navigation />
            <h2>Welcome</h2>
        </div>
    );
};

export default Dashboard;