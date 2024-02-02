import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Service from './Service';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', invalidCredentials: '' });


  const validateForm = () => {
    let isValid = true;
  const newErrors = {
    email: '',
    password: '',
    invalidCredentials: '', // Clear invalid credentials error
  };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!credentials.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(credentials.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Validate password
    if (!credentials.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
    
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
  
    if (validateForm()) {
      console.log('Submitting form...'); // Log before Axios request
      try {
        const response = await axios.post('http://localhost:8080/todo/login', credentials, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        navigate('/todo-list');
        Service.setToken(response.data.token);
        
      } catch (error) {
        console.error('Axios Error:', error);
        console.log("catch block")
  
        if (error.response) {
          console.error('Response Data:', error.response.data);
          console.error('Response Status:', error.response.status);
        
          if (error.response.status === 401) {
            setErrors({ invalidCredentials: 'Invalid credentials' });
            console.log('Errors after setting invalid credentials:', errors);
          }
          // Add logic to handle other login failures, if needed
        } else if (error.request) {
          console.error('Request made but no response received');
        } else {
          console.error('Error setting up the request');
        }
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card col-md-6 offset-md-3">
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          <form onSubmit={handleSubmit}>
            {errors.invalidCredentials && (
              <div className="alert alert-danger" role="alert">
                {errors.invalidCredentials}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                name="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>
            <button type="submit" className="btn btn-success btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
