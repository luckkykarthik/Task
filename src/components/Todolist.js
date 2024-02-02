import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Service from './Service';

const Todolist = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [userid, setUserid] = useState();
  const [sortBy, setSortBy] = useState('due_date');
  const [filterByCompleted, setFilterByCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Service.getProfile();
        const userid = response.id;
        setUserid(userid);
        const tasks = await Service.getAllTasks(userid);
        setList(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [userid]);

  const deleteHandler = async (taskid) => {
    try {
      const response = await Service.deleteTaskById(userid, taskid);
      const task = response.id;

      setSuccessMessage('Task Deleted successfully!');
      setIsSuccessVisible(true);

      setTimeout(() => {
        setIsSuccessVisible(false);
      }, 3000);

      setList((prevList) => prevList.filter((task) => task.id !== taskid));
    } catch (error) {
      console.error('Error deleting task:', error);
      console.log('Detailed error response:', error.response);
    }
  };

  const updateHandler = (id) => {
    navigate(`/update-task/${id}`);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = () => {
    setFilterByCompleted(!filterByCompleted);
  };

  const priorityColor = (dueDate) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);

    if (taskDueDate < currentDate) {
      return 'text-danger'; // overdue tasks
    } else if (taskDueDate.getDate() === currentDate.getDate()) {
      return 'text-warning'; // tasks due today
    } else {
      return 'text-success'; // tasks due in the future
    }
  };

  const filteredAndSortedTasks = list
    .filter((task) => (!filterByCompleted || task.completed))
    .sort((a, b) => {
      if (sortBy === 'due_date') {
        return new Date(a.due_date) - new Date(b.due_date);
      } else if (sortBy === 'completed') {
        return a.completed - b.completed;
      }
    });

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col">
          <label className="mr-2">
            Sort by:
            <select value={sortBy} onChange={handleSortChange} className="form-control-sm ml-2">
              <option value="due_date">Due Date</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <label>
            Filter Completed:
            <input
              type="checkbox"
              checked={filterByCompleted}
              onChange={handleFilterChange}
              className="ml-2"
            />
          </label>
        </div>
      </div>

      {isSuccessVisible && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {filteredAndSortedTasks.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No tasks available. <button className="btn btn-primary btn-sm ml-2" onClick={() => navigate('/create-task')}>Create Task</button>
        </div>
      ) : (
        <div className="row">
          {filteredAndSortedTasks.map((todo) => (
            <div key={todo.id} className={`col-md-4 mb-4 ${priorityColor(todo.due_date)}`}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{todo.title}</h5>
                  <p className="card-text">Id: {todo.id}</p>
                  <p className="card-text">Description: {todo.description}</p>
                  <p className="card-text">Due Date: {todo.due_date}</p>
                  <p className="card-text">Completed: {todo.completed}</p>
                  <button
                    type="button"
                    className="btn btn-info mr-2"
                    onClick={() => updateHandler(todo.id)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteHandler(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Todolist;
