import useAuthStore from "../stores/authStore";
import apiClient from "./apiClient";
export const fetchAllTeams = async () => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.get("/teams", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createTeam = async ( teamData: { teamName: string }) => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.post("/teams", teamData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addUserToTeam = async ( data: { teamId: number; userId: number }) => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.post(`/teams/${data.teamId}/add_user`, { userId: data.userId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const removeUserFromTeam = async (data: { teamId: number; userId: number }) => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.delete(`/teams/${data.teamId}/remove_user`, {
    data: { userId: data.userId }, headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
