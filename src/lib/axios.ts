import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(config => {
    const token = getBearerToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

api.interceptors.response.use(
    response => response,
    error => {
        console.log(error);
        if (error.response && error.response.status === 401) {
            cleanToken();
        }
        console.error('API error:', error);
        return Promise.reject(error);
    }
);

export function getBearerToken(): boolean | string {
    return localStorage.getItem('token') ?? false;
}
export function cleanToken() {
    localStorage.removeItem('token');
}
export function setToken(token: string) {
    localStorage.setItem('token', token);
}


