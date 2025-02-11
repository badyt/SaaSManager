import apiClient from "./apiClient";
export const fetchAllTeams = async () => {
  const response = await apiClient.get("/teams/getAllTeams");
  return response.data;
};

export const fetchAllTeamsWithUsers = async () => {
  const response = await apiClient.get("/teams/getAllTeamsWithUsers");
  return response.data;
}

export const createTeam = async (teamData: { team_name: string, created_by: number, description: string }) => {
  const response = await apiClient.post("/teams/createTeam", teamData);
  return response.data;
};

export const addUserToTeam = async (data: { teamId: number; userId: number }) => {
  const response = await apiClient.post(`/teams/${data.teamId}/add_user`, { user_id: data.userId }
  );
  return response.data;
};

export const removeUserFromTeam = async (data: { teamId: number; userId: number }) => {
  const response = await apiClient.delete(`/teams/${data.teamId}/remove_user`, {
    data: { user_id: data.userId }
  });
  return response.data;
};
