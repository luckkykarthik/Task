import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

// ... (Previous code)

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name
    if (!user.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!user.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Make the Axios POST request to the registration endpoint
        const response = await axios.post('http://localhost:8080/todo/register', user, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        navigate('/login');
        console.log('Registration successful:', response.data);
        // Add logic to handle successful registration, e.g., display a success message
      } catch (error) {
        console.error('Axios Error:', error);

        if (error.response) {
          console.error('Response Data:', error.response.data);
          console.error('Response Status:', error.response.status);

          if (error.response.status === 409) {
            // Email already exists, show the error label
            setErrors((prevErrors) => ({ ...prevErrors, email: 'Email already exists' }));
          }
          // Add logic to handle other registration failures, if needed
        } else if (error.request) {
          console.error('Request made but no response received');
        } else {
          console.error('Error setting up the request');
        }
      }
      // Reset the form fields after successful submission or handle failure appropriately
      setUser({ name: '', email: '', password: '' });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Registration</h5>

          {/* Display error message if email already exists */}
          {errors.email && (
            <div className="alert alert-danger" role="alert">
              {errors.email}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="form-group">
              <input
                type="text"
                className={`form-control ${errors.email && errors.email !== 'Email already exists' ? 'is-invalid' : ''}`}
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
              />
              {/* Remove is-invalid class from the email input */}
              {errors.email && errors.email !== 'Email already exists' && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary mr-2">
              Register
            </button>
            <button
              type="reset"
              className="btn btn-secondary"
              onClick={() => setUser({ name: '', email: '', password: '' })}
            >
              Reset
            </button>
          </form>
          {/* Display the list of registered users */}
        </div>
      </div>
    </div>
  );
};

export default Register;

