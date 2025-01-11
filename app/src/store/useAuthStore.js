import { create } from "zustand";
import AxiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URI = "http://localhost:5000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await AxiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log(error);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await AxiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await AxiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disConnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await AxiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await AxiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URI, {
      query: {
        userId: authUser._id,
      },
    });

    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      set({ onlineUsers: [] });
    });
  },

  disConnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
