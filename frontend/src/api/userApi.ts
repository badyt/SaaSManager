import useAuthStore from "../stores/authStore";
import apiClient from "./apiClient";

export const fetchUsers = async () => {
  const response = await apiClient.get("/users/getUsers");
  return response.data;
};

export const createUser = async (userData: { email: string; password: string, name: string }) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};


export const fetchUserTeams = async () => {
  const response = await apiClient.get("/teams/my-teams");
  return response.data;
};

export const updateUser = async (data: Partial<{ id: number; email: string; status: string; password: string; role: string; name: string }>) => {
  if (!data.id) {
    throw new Error("userId is required to update user.");
  }
  const response = await apiClient.put(`/users/updateUser/${data.id}`, data)
  return response.data;
}

export const updateUserPassword = async (data: { id: number, oldPassword: string, newPassword: string }) => {
  const response = await apiClient.put(`/users/updateUserPassword/${data.id}`, data)
  return response.data;
}
