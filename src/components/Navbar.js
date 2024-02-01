import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Service from './Service';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Service.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
        
          {Service.isLoggedIn() && (
            <>
              <li className="nav-item">
                <Link to="/todo-list" className="nav-link">
                  Todo List
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create-task" className="nav-link">
                  Create Task
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
          {!Service.isLoggedIn() && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
