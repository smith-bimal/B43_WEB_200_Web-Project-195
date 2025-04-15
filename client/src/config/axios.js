import axios from 'axios';
import { useNavigate } from 'react-router';

const navigate = useNavigate();

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true
});


instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (error.response?.status === 401 && !originalRequest._retry) {
      const token = localStorage.getItem('token');

      if (token) {
        try {

          const tokenData = JSON.parse(atob(token.split('.')[1]));
          const isExpired = tokenData.exp * 1000 < Date.now();

          if (isExpired) {
            localStorage.clear();
            navigate('/login');
            return Promise.reject(error);
          }


          originalRequest._retry = true;
          return instance(originalRequest);
        } catch (err) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
