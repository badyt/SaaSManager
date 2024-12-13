import { useMutation, useQuery } from "react-query";
import {
  fetchAllTeams,
  createTeam,
  addUserToTeam,
  removeUserFromTeam,
} from "../api/teamsApi";

// Queries
export const useFetchAllTeams = () => {
  return useQuery(["teams"], fetchAllTeams);
};

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
