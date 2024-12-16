import { create } from "zustand";

interface State {
  token: string | null;
  username: string | null;
  role: string | null;
  email: string | null;
}
interface Action {
  setToken: (token: string) => void;
  setUsername: (username: string) => void;
  setRole: (role: string) => void;
  setEmail: (email: string) => void;
  setUserInfo: (token: string, username: string, role: string, email: string) => void;
  logout: () => void;
}

const useAuthStore = create<State & Action>((set) => ({
  token: null,
  username: null,
  role: null,
  email: null,
  setUserInfo: (token, username, role, email) => set({ token, username, role, email }),
  setToken: (token) => set({ token }),
  setUsername: (username) => set({ username }),
  setRole: (role) => set({ role }),
  setEmail: (email) => set({ email }),
  logout: () => set({ token: null, username: null, role: null }),
}));


export default useAuthStore;
