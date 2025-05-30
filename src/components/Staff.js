import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Staff() {
  return (
    <div className="staff-container">
      <h2>Staff Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/scheduler">View Schedule</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>
      <div className="staff-content">
        <h3>Welcome to Staff Dashboard</h3>
        <p>Manage your schedule and view important information here.</p>
      </div>
    </div>
  );
}

export default Staff; 