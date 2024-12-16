import { useQuery } from "react-query";
import { fetchUserTeams, fetchUsers } from "../api/userApi";

export const useUsers = () => {
  return useQuery(["users"], fetchUsers);
};


export const useUserTeams = () => {
  return useQuery(["userTeams"], fetchUserTeams);
};

