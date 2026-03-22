import axios from 'axios';

const AUTH_URL = 'http://localhost:8080/auth';
const USER_URL = 'http://localhost:8080/users';

export const userService = {
    getAllUsers: () => {
        return axios.get(USER_URL)
            .then(response => response.data)
            .catch(() => []);
    },

    registerUser: (userData) => {
        const { username, email, password } = userData;
        return axios.post(`${AUTH_URL}/register`, { username, email, password });
    },

    checkDuplicate: (field, value, users) => {
        if (!value) return false;
        return users.some(user => user[field] === value);
    },

    loginUser: (credentials) => {
        return axios.post(`${AUTH_URL}/login`, credentials);
    },
};