import { create } from "zustand";

interface State {
  userId?: number;
  token?: string;
  refreshToken?: string;
  username?: string;
  role?: string;
  email?: string;
  status?: string;
}
interface Action {
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUsername: (username: string) => void;
  setUserId: (userId: number) => void;
  setRole: (role: string) => void;
  setEmail: (email: string) => void;
  setStatus: (status: string) => void;
  setUserInfo: (userId?: number, token?: string, refreshToken?: string, username?: string, role?: string, email?: string, status?: string) => void;
  logout: () => void;
}

const storedAuthData = JSON.parse(localStorage.getItem("auth") || "{}");

const useAuthStore = create<State & Action>((set) => ({
  userId: storedAuthData.userId || undefined,
  token: storedAuthData.token || undefined,
  refreshToken: storedAuthData.refreshToken || undefined,
  username: storedAuthData.username || undefined,
  role: storedAuthData.role || undefined,
  email: storedAuthData.email || undefined,
  status: storedAuthData.status || undefined,


  setUserInfo: (userId, token, refreshToken, username, role, email, status) => {
    const userData = { userId, token, refreshToken, username, role, email, status };
    localStorage.setItem("auth", JSON.stringify(userData)); // Save user info in localStorage
    set(userData);
  },

  setUserId: (userId) => set((state) => {
    const updatedState = { ...state, userId };
    localStorage.setItem("auth", JSON.stringify(updatedState));
    return updatedState;
  }),

  setToken: (token) => set((state) => {
    const updatedState = { ...state, token };
    localStorage.setItem("auth", JSON.stringify(updatedState));
    return updatedState;
  }),
  setRefreshToken: (refreshToken) => set((state)=> {
    const updatedState = { ...state, refreshToken };
    localStorage.setItem("auth", JSON.stringify(updatedState));
    return updatedState;
  }),

  setUsername: (username) => set((state) => {
    const updatedState = { ...state, username };
    localStorage.setItem("auth", JSON.stringify(updatedState));
    return updatedState;
  }),

  setRole: (role) => set((state) => {
    const updatedState = { ...state, role };
    localStorage.setItem("auth", JSON.stringify(updatedState));
    return updatedState;
  }),

  setEmail: (email) => set((state) => {
    const updatedState = { ...state, email };
    localStorage.setItem("auth", JSON.stringify(updatedState));
    return updatedState;
  }),

  setStatus: (status) => set((state) => {
    const updatedState = { ...state, status };
    localStorage.setItem("auth", JSON.stringify(updatedState));
    return updatedState;
  }),

  logout: () => {
    localStorage.removeItem("auth"); // Clear localStorage
    set({ userId: undefined, token: undefined, refreshToken: undefined, username: undefined, role: undefined, email: undefined, status: undefined });
  },
}));


export default useAuthStore;
