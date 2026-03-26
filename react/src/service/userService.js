import axios from 'axios';
import api from "../api/axios.js";

const AUTH_URL = 'http://localhost:8080/auth';
const USER_URL = 'http://localhost:8080/users';

export const userService = {
    getAllUsers: () => {
        return api.get(USER_URL)
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

    loginUser: async (credentials) => {
        return await api.post(`${AUTH_URL}/login`, credentials);
    },
};