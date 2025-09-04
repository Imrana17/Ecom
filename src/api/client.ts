import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
copilot/fix-7666d7e6-b672-4669-8521-3e208ee697ba
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',

 copilot/fix-71a130d2-443a-4c12-be5a-7acdf1658ef9
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/restaurant/api/', main main
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;