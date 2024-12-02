import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080", // Base URL for all requests
});

export const fetchUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const createUser = async (userData: { email: string; password: string }) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};
