import axios from "axios";

const API = axios.create({
        baseURL: "/api",
});

// Attach token to every request
API.interceptors.request.use((config) => {
        const token = localStorage.getItem("userToken");
        if (token) {
                config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
});
API.interceptors.response.use(
        (response) => response,
        (error) => {
                if (error.response?.status === 401) {
                        localStorage.removeItem("userToken");
                        window.location.href = "/login";
                }
                return Promise.reject(error);
        }
);
export default API;
