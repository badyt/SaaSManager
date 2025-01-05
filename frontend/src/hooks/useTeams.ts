import { useMutation, useQuery } from "react-query";
import {
  fetchAllTeams,
  createTeam,
  addUserToTeam,
  removeUserFromTeam,
  fetchAllTeamsWithUsers,
} from "../api/teamsApi";

// Queries
export const useFetchAllTeams = () => {
  return useQuery(["teams"], fetchAllTeams);
};

export const useFetchAllTeamsWithUsers = () => {
  return useQuery(["teamsWithUsers"], fetchAllTeamsWithUsers)
}

// Mutations
export const useCreateTeam = () => {
  return useMutation(createTeam);
};

export const useAddUserToTeam = () => {
  return useMutation(addUserToTeam);
};

export const useRemoveUserFromTeam = () => {
  return useMutation(removeUserFromTeam);
};
