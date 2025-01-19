import useAuthStore from "../stores/authStore";
import apiClient from "./apiClient";

export const fetchUsers = async () => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.get("/users/getUsers",
    {
      headers: { Authorization: `Bearer ${token}` },
    });
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
  const { token } = useAuthStore.getState();
  const response = await apiClient.get("/teams/my-teams",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateUser = async (data: Partial<{ id: number; email: string; status: string; password: string; role: string; name: string }>) => {
  if (!data.id) {
    throw new Error("userId is required to update user.");
  }
  const { token } = useAuthStore.getState();
  const response = await apiClient.put(`/users/updateUser/${data.id}`,
    data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }

  })
  return response.data;
}

export const updateUserPassword = async (data: { id: number, oldPassword: string, newPassword: string }) => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.put(`/users/updateUserPassword/${data.id}`,
    data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }

  })
  return response.data;
}
