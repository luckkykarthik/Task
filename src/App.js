// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Login from './components/Login';
// import TaskForm from './components/Taskform';
// import Register from './components/Register';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import Todolist from './components/Todolist';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/create-task" element={<TaskForm/>}/>
//          <Route path="/todo-list" element={<Todolist/>}/>
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TaskForm from './components/Taskform';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Todolist from './components/Todolist';
import Service from './components/Service';
import Update from './components/Update';
import Profile from './components/Profile';

const PrivateRoute = ({ element }) => {
  return Service.isLoggedIn() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-task/:id" element={<Update />} />
          <Route
            path="/create-task"
            element={<PrivateRoute element={<TaskForm />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="/todo-list"
            element={<PrivateRoute element={<Todolist />} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
