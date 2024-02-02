import React, { useState } from 'react';
import Service from './Service';

const TaskForm = ({ onFormSubmit }) => {
  const [task, setTask] = useState({ title: '', description: '', due_date: '', completed: 'No' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate title
    if (!task.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    // Validate description
    if (!task.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    // Validate due_date
    if (!task.due_date) {
      newErrors.due_date = 'Due Date is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error when the user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await Service.getProfile();
        const userid = response.id;

        await Service.createTask(task, userid);

        setTask({ title: '', description: '', due_date: '' });
        setSuccessMessage('Task created successfully!');
        setIsSuccessVisible(true);
        setErrors({}); // Reset errors

        // Hide success message after 3 seconds
        setTimeout(() => {
          setIsSuccessVisible(false);
        }, 3000);
      } catch (error) {
        console.error('Error creating task:', error);

        if (error.response && error.response.status === 409) {
          // Conflict: Title already exists
          setErrors({ title: 'Title already exists' });
        } else {
          // Other errors
          setErrors({ generic: 'Error creating task' });
        }
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Todos Management System</h5>
          {isSuccessVisible && <div className="alert alert-success">{successMessage}</div>}
          {errors.generic && <div className="alert alert-danger">{errors.generic}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                name="title"
                placeholder="Title"
                value={task.title}
                onChange={changeHandler}
              />
              <div className="invalid-feedback">{errors.title}</div>
            </div>
            <div className="form-group">
              <input
                type="text"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                name="description"
                placeholder="Description"
                value={task.description}
                onChange={changeHandler}
              />
              <div className="invalid-feedback">{errors.description}</div>
            </div>
            <div className="form-group">
              <input
                type="date"
                className={`form-control ${errors.due_date ? 'is-invalid' : ''}`}
                name="due_date"
                value={task.due_date}
                onChange={changeHandler}
              />
              <div className="invalid-feedback">{errors.due_date}</div>
            </div>
            <button type="submit" className="btn btn-primary mr-2">
              Add
            </button>
            <button type="reset" className="btn btn-secondary" onClick={() => setTask({ title: '', description: '', due_date: '' })}>
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
