import useAuthStore from "../stores/authStore";
import apiClient from "./apiClient";
export const fetchAllTeams = async () => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.get("/teams/getAllTeams", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchAllTeamsWithUsers = async () => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.get("/teams/getAllTeamsWithUsers", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export const createTeam = async (teamData: { team_name: string, created_by: number, description: string }) => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.post("/teams/createTeam", teamData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addUserToTeam = async (data: { teamId: number; userId: number }) => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.post(`/teams/${data.teamId}/add_user`, { user_id: data.userId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const removeUserFromTeam = async (data: { teamId: number; userId: number }) => {
  const { token } = useAuthStore.getState();
  const response = await apiClient.delete(`/teams/${data.teamId}/remove_user`, {
    data: { user_id: data.userId }, headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
