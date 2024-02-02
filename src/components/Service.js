// Service.js
import axios from "axios";

const baseURL = "http://localhost:8080"; // Changed name to baseURL

class Service {
  constructor() {
    this.initInterceptor();
  }

  isTokenRequired(path) {
    const pathsExcludingToken = ["/todo/register", "todo/login"];
    return !pathsExcludingToken.some((excludedPath) => path.startsWith(excludedPath));
  }

  initInterceptor() {
    axios.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token && this.isTokenRequired(config.url)) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  async getProfile() {
    try {
      const response = await axios.get(`${baseURL}/todo/profile`);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile data:', error);
      throw error;
    }
  }

  async createTask(task, userid) {
    try {
      const response = await axios.post(`${baseURL}/api/${userid}/tasks`, task);
      return response.data; // Assuming that the response directly contains the created task data
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn = () => {
    let token = this.getToken();
    return !!token; // Simplified check for the presence of token
  };

  logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  async getAllTasks(userid) {
     try {
       const response = await axios.get(`${baseURL}/api/${userid}/tasks`);
       return response.data; // Assuming the backend returns an array of tasks
     } catch (error) {
       console.error('Error getting tasks:', error);
       throw error;
     }
   }
   async getTaskById(userid,taskId){
     try {
          const response = await axios.get(`${baseURL}/api/${userid}/tasks/${taskId}`);
          return response.data; 
        } catch (error) {
          console.error('Error getting tasks:', error);
          throw error;
        }
   }

   async updateTaskById(userid, taskId, taskData) {
    try {
      const response = await axios.put(`${baseURL}/api/${userid}/tasks/${taskId}`, taskData);
      // console.log("hello"+JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }
  async deleteTaskById(userid,taskId){
    try {
         const response = await axios.delete(`${baseURL}/api/${userid}/tasks/${taskId}`);
         return response.data; 
       } catch (error) {
         console.error('Error getting tasks:', error);
         throw error;
       }
  }
  
}

export default new Service();
