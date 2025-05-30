import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [staffList, setStaffList] = useState([
    { name: "Eswar", staffId: "SF01", role: "Nurse", shift: "Morning" },
    { name: "Kishore", staffId: "SF02", role: "Doctor", shift: "Morning" },
    { name: "Prashant", staffId: "SF03", role: "Doctor", shift: "Evening" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [staffForm, setStaffForm] = useState({ name: '', staffId: '', role: 'Doctor', shift: 'Morning' });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Modal handlers
  const openAddStaff = () => setShowAddStaff(true);
  const closeAddStaff = () => setShowAddStaff(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setStaffForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStaffList(prev => [
      ...prev,
      {
        name: staffForm.name,
        staffId: staffForm.staffId,
        role: staffForm.role,
        shift: staffForm.shift
      }
    ]);
    setStaffForm({ name: '', staffId: '', role: 'Doctor', shift: 'Morning' });
    closeAddStaff();
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      const sidebarToggle = document.getElementById('sidebarToggle');
      
      if (isSidebarOpen && 
          sidebar && 
          !sidebar.contains(event.target) && 
          sidebarToggle && 
          !sidebarToggle.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleRoleCardClick = (role) => {
    setSelectedRole(selectedRole === role ? "" : role);
  };

  const filteredStaff = staffList.filter((staff) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      staff.name.toLowerCase().includes(q) ||
      staff.staffId.toLowerCase().includes(q) ||
      staff.role.toLowerCase().includes(q);
    const matchesRole = selectedRole ? staff.role === selectedRole : true;
    return matchesQuery && matchesRole;
  });

  return (
    <>
      {/* Sidebar */}
      <div 
        id="sidebar" 
        className={`sidenav ${isSidebarOpen ? 'sidenav-open' : ''}`}
      >
        <div className="sidenav-header d-flex align-items-center justify-content-between px-3 py-2">
          <span className="fw-bold">Menu</span>
          <button 
            className="btn-close" 
            onClick={closeSidebar}
            aria-label="Close"
          ></button>
        </div>
        <ul className="nav flex-column px-3">
          <li className="nav-item">
            <Link className="nav-link active" to="/dashboard" onClick={closeSidebar}>Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/staff" onClick={closeSidebar}>Staff</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/appointments" onClick={closeSidebar}>Appointments</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/attendance" onClick={closeSidebar}>Attendance</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/settings" onClick={closeSidebar}>Settings</Link>
          </li>
        </ul>
      </div>

      {/* Overlay for sidebar */}
      <div 
        id="sidebarOverlay" 
        className={`sidenav-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      ></div>

      {/* Add Staff Modal */}
      {showAddStaff && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 align-items-left">Add Staff</h5>
              <button className="btn-close" onClick={closeAddStaff} aria-label="Close"></button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control modal-input"
                  name="name"
                  value={staffForm.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Staff ID</label>
                <input
                  type="text"
                  className="form-control modal-input"
                  name="staffId"
                  value={staffForm.staffId}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select modal-input"
                  name="role"
                  value={staffForm.role}
                  onChange={handleFormChange}
                  required
                >
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Technician">Technician</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Shift Preference</label>
                <select
                  className="form-select modal-input"
                  name="shift"
                  value={staffForm.shift}
                  onChange={handleFormChange}
                  required
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
              <div className="d-flex justify-content-center gap-2 ">
                {/* <button type="button" className="btn btn-secondary" onClick={closeAddStaff}>Cancel</button> */}
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <button 
            className="btn btn-outline-secondary me-2" 
            id="sidebarToggle"
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
            <img src="/images/logo.png" width="32" className="me-2" alt="logo"/>
            <span>HCSS Tracker</span>
          </Link>
          <div className="d-flex align-items-center ms-auto me-2">
            <div className="dropdown">
              <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
                <img src="/images/profile.png" alt="profile" width="32" height="32" className="rounded-circle me-2"/>
                <span>Prabhakar</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li><Link className="dropdown-item" to="/">Logout</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container my-4">
        <div className="mb-3">
          <h5>Dashboard <small className="text-muted">Here are your important tasks, updates and alerts.</small></h5>
        </div>
        <div className="row g-3 mb-4">
          <div className="col-md-2">
            <div
              className={`card text-center h-100 role-card${selectedRole === "Doctor" ? " role-card-selected" : ""}`}
              onClick={() => handleRoleCardClick("Doctor")}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                {/* <span className="badge bg-primary position-absolute top-0 end-0 m-2">3 New</span> */}
                <img src="https://img.icons8.com/ios-filled/50/fa314a/doctor-male.png" width="32" alt="doctors"/>
                <h6 className="mt-2">Doctors</h6>
                <h5>350</h5>
                <div className="d-flex flex-column align-items-center gap-1 mt-3">
                  <span className="d-flex align-items-center"><span className="dot dot-assigned me-1"></span><span className="text-success">Assigned</span> <span className="ms-1 fw-bold">200</span></span>
                  <span className="d-flex align-items-center"><span className="dot dot-unassigned me-1"></span><span className="text-danger">Unassigned</span> <span className="ms-1 fw-bold">150</span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className={`card text-center h-100 role-card${selectedRole === "Nurse" ? " role-card-selected" : ""}`}
              onClick={() => handleRoleCardClick("Nurse")}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <img src="https://img.icons8.com/ios-filled/50/fa314a/nurse-female.png" width="32" alt="nurses"/>
                <h6 className="mt-2">Nurses</h6>
                <h5>2,354</h5>
                <div className="d-flex flex-column align-items-center gap-1 mt-3">
                  <span className="d-flex align-items-center"><span className="dot dot-assigned me-1"></span><span className="text-success">Assigned</span> <span className="ms-1 fw-bold">2,000</span></span>
                  <span className="d-flex align-items-center"><span className="dot dot-unassigned me-1"></span><span className="text-danger">Unassigned</span> <span className="ms-1 fw-bold">354</span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className={`card text-center h-100 role-card${selectedRole === "Pharmacist" ? " role-card-selected" : ""}`}
              onClick={() => handleRoleCardClick("Pharmacist")}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <img src="https://img.icons8.com/ios-filled/50/fa314a/calendar.png" width="32" alt="pharmacist"/>
                <h6 className="mt-2">Pharmacist</h6>
                <h5>29</h5>
                <div className="d-flex flex-column align-items-center gap-1 mt-3">
                  <span className="d-flex align-items-center"><span className="dot dot-assigned me-1"></span><span className="text-success">Assigned</span> <span className="ms-1 fw-bold">20</span></span>
                  <span className="d-flex align-items-center"><span className="dot dot-unassigned me-1"></span><span className="text-danger">Unassigned</span> <span className="ms-1 fw-bold">9</span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100 h-100 py-4">+ Add Role</button>
          </div>
        </div>

        {/* Staff Directory */}
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center mb-3 gap-3 justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <h5 className="mb-0">Staffs Directory</h5>
                <input
                  type="text"
                  className="form-control staff-search-input"
                  placeholder="Search by name, ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="btn btn-primary btn-sm add-staff-btn" onClick={openAddStaff}>+ Add Staff</button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Staff ID</th>
                    <th>Role</th>
                    <th>Shift Preference</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.length === 0 ? (
                    <tr><td colSpan="4" className="text-center">No staff found.</td></tr>
                  ) : (
                    filteredStaff.map((staff, idx) => (
                      <tr key={idx}>
                        <td>{staff.name}</td>
                        <td>{staff.staffId}</td>
                        <td>{staff.role}</td>
                        <td>{staff.shift}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard; 