import { useQuery } from "react-query";
import { fetchUsers } from "../api/userApi";

export const useUsers = () => {
  return useQuery(["users"], fetchUsers);
};
