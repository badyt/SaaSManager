import useAuthStore from "../stores/authStore";
import apiClient from "./apiClient";

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

export const fetchUserProfile = async () => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.get("/users/profile",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const fetchUserTeams = async () => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.get("/teams/my-teams",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
