import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Scheduler() {
  return (
    <div className="scheduler-container">
      <h2>Schedule Management</h2>
      <nav>
        <Link to="/staff">Back to Dashboard</Link>
      </nav>
      <div className="calendar-view">
        <h3>Weekly Schedule</h3>
        <div className="schedule-grid">
          {}
          <p>Calendar view will be implemented here</p>
        </div>
      </div>
    </div>
  );
}

export default Scheduler; 