import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

const token = localStorage.getItem("chat-app");

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  isMessagesLoading: false,
  isUsersLoading: false,
  selectedUser: null,

  getAllUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("get all uses", res.data);

      set({ users: res.data });
      set({ isUsersLoading: false });
    } catch (error) {
      console.log(error);
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (receiverId) => {
    set({ isMessagesLoading: true });

    try {
      const res = axiosInstance.get(`message/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ messages: res.data });
      set({ isMessagesLoading: false });
    } catch (error) {
      console.log(error);
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        { messageData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set({ messages: [...get().messages, res.data] });
    } catch (error) {
      console.log(error);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
