import axios from 'axios';

const API_URL = "http://localhost:8000/api/v1";

// Create axios instance with default configuration
const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true, // This ensures cookies are sent and received
    headers: {
        'Content-Type': 'application/json',
    },
});

const fileApiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export {apiClient, fileApiClient};
