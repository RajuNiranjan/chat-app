import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  isLoading: false,
  user: null,

  register: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      localStorage.setItem("chat-app", res.data.token);
      set({ isLoading: false });
    } catch (error) {
      toast.error(error.response.data.message);
      set({ isLoading: false });
    }
  },

  login: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      localStorage.setItem("chat-app", res.data.token);
      set({ isLoading: false });
    } catch (error) {
      toast.error(error.response.data.message);
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("chat-app");
    set({ user: null });
  },

  getUser: async () => {
    const token = localStorage.getItem("chat-app");
    console.log("token", token);
    if (token) {
      const res = await axiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: res.data.user });
    }
  },
}));
