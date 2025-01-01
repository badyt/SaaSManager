import { useMutation, useQuery } from "react-query";
import { fetchUserTeams, fetchUsers, updateUser, updateUserPassword } from "../api/userApi";

export const useUsers = () => {
  return useQuery(["users"], fetchUsers);
};


export const useUserTeams = () => {
  return useQuery(["userTeams"], fetchUserTeams);
};

export const useUpdateUser = () => {
  return useMutation(updateUser);
}

export const useUpdatePassword = () => {
  return useMutation(updateUserPassword);
}

