import { create } from "zustand";

interface State {
  userId: number | undefined;
  token: string | undefined;
  username: string | undefined;
  role: string | undefined;
  email: string | undefined;
  status: string | undefined;
}
interface Action {
  setToken: (token: string) => void;
  setUsername: (username: string) => void;
  setUserId: (userId: number) => void;
  setRole: (role: string) => void;
  setEmail: (email: string) => void;
  setStatus: (status: string) => void;
  setUserInfo: (userId: number, token: string, username: string, role: string, email: string, status: string) => void;
  logout: () => void;
}

const useAuthStore = create<State & Action>((set) => ({
  userId: undefined,
  token: undefined,
  username: undefined,
  role: undefined,
  email: undefined,
  status: undefined,
  setUserInfo: (userId, token, username, role, email, status) => set({ userId, token, username, role, email, status }),
  setUserId: (userId) => set({ userId }),
  setToken: (token) => set({ token }),
  setUsername: (username) => set({ username }),
  setRole: (role) => set({ role }),
  setEmail: (email) => set({ email }),
  setStatus: (status) => set({ status }),
  logout: () => set({ userId: undefined, token: undefined, username: undefined, role: undefined, email: undefined, status: undefined }),
}));


export default useAuthStore;
