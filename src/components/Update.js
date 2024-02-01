import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import Service from './Service';

const Update = ({ onUpdate }) => {
  const params = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',  // Use 'due_date' instead of 'date'
    completed: 'No',
  });
  const [errors, setErrors] = useState({});
  const [userId,setUserid]=useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);


  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await Service.getProfile();
        const userid = response.id;
        setUserid(userid);
        const taskId = params.id;
        const taskDetails = await Service.getTaskById(userid, taskId);
        console.log(taskDetails)
        setFormData(taskDetails);
      } catch (error) {
        console.error('Error fetching task details:', error);
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

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validateForm()) {

      console.log(formData);
      try {

        await Service.updateTaskById(userId,params.id,formData);

        // setTask({ title: '', description: '', due_date: '' });
        setSuccessMessage('Task Updated successfully!');
        setIsSuccessVisible(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setIsSuccessVisible(false);
        }, 3000);
      } catch (error) {
        console.error('Error in updating task:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
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
          <label htmlFor="due_date">Due Date</label>  {/* Change 'date' to 'due_date' here */}
          <input
            type="date"
            className="form-control"
            id="due_date"  // Change 'date' to 'due_date' here
            name="due_date"  // Change 'date' to 'due_date' here
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
