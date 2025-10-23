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

// const secureApiClient = axios.create({
//     baseURL: API_URL,
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })

// secureApiClient.interceptors.request.use(
//   (config) => {
//     // 3. Get the token from your Redux state
//     const state = store.getState();
//     const token = state.auth.token;

//     // 4. If the token exists, add it to the Authorization header
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }

//     return config; // Continue with the request
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const fileApiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export {apiClient, fileApiClient, };
