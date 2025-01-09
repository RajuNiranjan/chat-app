import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-hot-toast";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoading: false,

  checkAuth: async () => {
    const token = localStorage.getItem("chat-app");
    if (token) {
      const res = await axiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ authUser: res.data.user });
    }
  },

  signUp: async (formData) => {
    set({ isLoading: true });
    const { checkAuth } = get();
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      localStorage.setItem("chat-app", res.data.token);
      set({ isLoading: false });
      checkAuth();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      set({ isLoading: false });
    }
  },

  login: async (formData) => {
    set({ isLoading: true });
    const { checkAuth } = get();
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      localStorage.setItem("chat-app", res.data.token);
      set({ isLoading: false });
      checkAuth();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("chat-app");
    set({ authUser: null });
    const { checkAuth } = get();
    checkAuth();
  },
}));
