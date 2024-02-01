import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Service from './Service';

const Todolist = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [userid, setUserid] = useState();

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

      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsSuccessVisible(false);
      }, 3000);

      // Remove the task from the list after successful deletion
      setList((prevList) => prevList.filter((task) => task.id !== taskid));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateHandler = (id) => {
    navigate(`/update-task/${id}`);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {list.map((todo) => (
          <div key={todo.id} className="col-md-4 mb-4">
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
      {isSuccessVisible && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Todolist;
