import { create } from "zustand";
import type { ChatState } from "./types";
import {axiosInstance} from '../../utils/axios'
import type { user } from "../auth/type";
import {useAuthStore} from '../auth/auth.store'

export const useChatStore = create<ChatState>((set, get) => ({
    users: [],
    isUsersLoading: false,
    conversations: [],
    selectedUser: null,
    getUsers: async () => {
        try {
            set({isUsersLoading:true})
            const res = await axiosInstance.get('/api/v1/auth/users')
            set({users:res.data})
        } catch (error) {
            console.log(error);
            
        } finally {
            set({isUsersLoading:false})
        }
    },
    setSelectedUser: (user: user | null) => {
        set({selectedUser:user})
    },
    getConversations: async () => {
        const {selectedUser} = get()
        try {
            const res = await axiosInstance.get(`/api/v1/chat/conversation/${selectedUser?._id}`)
            
            set({conversations:res.data})
        } catch (error) {
            console.log(error);
            
        }
    },
     subscribeToMessages: () => {
        try {
            const { selectedUser } = get()
            if (!selectedUser) return
            
            const socket = useAuthStore.getState().socket
            console.log("Subscribing to messages with socket:", socket?.id)
            console.log("Selected user:", selectedUser)

            socket?.on("newMessage", (newMessage) => {
                console.log("Received new message:", newMessage)
                if (newMessage.senderId === selectedUser._id) {
                    console.log("Adding message to conversations")
                    set({conversations:[...get().conversations, newMessage]})
                }
            })

        } catch (error) {
            console.log(error);
            
        }
    },
    unSubscribeToMessages: () => {
        try {
            const {socket} = useAuthStore.getState()
            socket?.off("newMessage")
        } catch (error) {
            console.log(error)
        };
                
     },
    sendMessage: async (message: string) => {
        try {
            const {selectedUser} = get()
            const res = await axiosInstance.post(`/api/v1/chat/send/${selectedUser?._id}`,{
                message
            })
            set({conversations:[...get().conversations,res.data]})
        } catch (error) {
            console.log(error);
            
        }
    },
   
}));
