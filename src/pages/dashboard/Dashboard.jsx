import React from "react";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const { username } = location.state || {}; 

  return (
    <div className="dashboard-container">
      <h1>Welcome {username ? username : 'User'}!</h1>  
      <div className="dashboard-content">
        <p>Please select a level of difficulty</p>
        <div className="dashboard-button-container">
          <Link to='/quizPage' state={{ difficulty: 'easy' }}>
            <button className="dashboard-button" id="easy-button">Easy</button>
          </Link>
          <Link to='/quizPage' state={{ difficulty: 'medium' }}>
            <button className="dashboard-button" id="medium-button">Medium</button>
          </Link>
          <Link to='/quizPage' state={{ difficulty: 'hard' }}>
            <button className="dashboard-button" id="hard-button">Hard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;