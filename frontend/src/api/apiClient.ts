import axios from "axios";
const apiClient = axios.create({
    baseURL: "http://localhost:8080", // Base URL for all requests
});

export default apiClient;