import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    Promise.reject(error)
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized! Logging out...");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
