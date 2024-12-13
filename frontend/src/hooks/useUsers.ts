import { useQuery } from "react-query";
import { fetchUserProfile, fetchUserTeams, fetchUsers } from "../api/userApi";

export const useUsers = () => {
  return useQuery(["users"], fetchUsers);
};

export const useUserProfile = () => {
  return useQuery(["userProfile"], fetchUserProfile);
};

export const useUserTeams = () => {
  return useQuery(["userTeams"], fetchUserTeams);
};

