import axios from "axios";



// user 
const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export default Axios;

//songs
const songAxios = axios.create({
  baseURL: import.meta.env.VITE_API_SONGES_URL,
});

export { 
  songAxios,
  Axios,
 };

 //Admin
const adminAxios = axios.create({
  baseURL: import.meta.env.VITE_API_ADMIN_URL,
});
export { adminAxios };

adminAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);