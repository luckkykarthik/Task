import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Service from './Service';

const Update = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',  
    completed: 'No',
  });
  const [errors, setErrors] = useState({});
  const [userId, setUserid] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await Service.getProfile();
        const userid = response.id;
        setUserid(userid);
        const taskId = params.id;

        // Fetch task details
        const taskDetails = await Service.getTaskById(userid, taskId);

        // Check if taskDetails is null or empty
        if (!taskDetails) {
          setErrorMessage('Task Not Found');
          setIsErrorVisible(true);
          return;
        }

        // Set form data if taskDetails is available
        setFormData(taskDetails);
      } catch (error) {
        // Check if the error status is 404 (Not Found)
        if (error.response && error.response.status === 404) {
          setErrorMessage('Task Not Found');
          setIsErrorVisible(true);
        } else {
          console.error('Error fetching task details:', error);
        }
      }
    };

    fetchTaskDetails();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? 'Yes' : 'No') : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await Service.updateTaskById(userId, params.id, formData);

        setSuccessMessage('Task Updated successfully!');
        setIsSuccessVisible(true);

        setTimeout(() => {
          setIsSuccessVisible(false);
          navigate('/'); // Navigate to the home page after a successful update
        }, 3000);
      } catch (error) {
        console.error('Error in updating task:', error);
        setErrorMessage('Error in updating task. Please try again.');
        setIsErrorVisible(true);
      }
    }
  };

  return (
    <div className="container mt-4">
      {isSuccessVisible && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {isErrorVisible && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <h1>Update Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled
          />
          <div className="invalid-feedback">{errors.title}</div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="due_date">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="due_date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="completed"
            name="completed"
            checked={formData.completed === 'Yes'}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="completed">
            Completed
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default Update;
