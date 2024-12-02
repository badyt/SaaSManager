import { useMutation } from "react-query";
import { createUser, loginUser } from "../api/userApi";

export const useRegister = () => {
  return useMutation(createUser);
};

export const useLogin = () => {
  return useMutation(loginUser);
};
