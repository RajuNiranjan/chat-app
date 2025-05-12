import { create } from 'zustand'
import type { authState } from './type'
import { axiosInstance } from '../../utils/axios'
import { io } from 'socket.io-client'


const SOCKET_BASE_URL=import.meta.env.MODE === 'development'?  'http://localhost:8000':"/"


export const useAuthStore = create<authState>((set, get) => ({
    user: null,
    isAuthLoading: false,
    isLoginLoading: false,
    isSignupLoading: false,
    isLogoutLoading: false,
    socket: null,
    signup: async (data) => {
        try {
            set({ isSignupLoading: true })
            const res = await axiosInstance.post('/api/v1/auth/signup', data)
            set({ user: res.data })
            get().connectSocket()
        } catch (error) {
            console.log(error);
        } finally {
            set({ isSignupLoading: false })
        }
    },
    login: async (data) => {
        try {
        set({ isLoginLoading: true })
            const res = await axiosInstance.post('/api/v1/auth/login', data)
            set({ user: res.data })
            get().connectSocket()
        } catch (error) {
            console.log(error);
        } finally {
            set({ isLoginLoading: false })
        }
     },
    logout: async () => {
        try {
            set({ isLogoutLoading: true })
            await axiosInstance.post('/api/v1/auth/logout')
            set({ user: null })
            get().disConnectSocket()
        } catch (error) {
            console.log(error);
        } finally {
            set({ isLogoutLoading: false })
        }
    },
    checkAuth: async () => {
        try {
            set({ isAuthLoading: true })
            const res = await axiosInstance.get('/api/v1/auth/check-auth')
            set({ user: res.data })
            
            get().connectSocket()
        } catch (error) {
            console.log(error);
        } finally {
            set({ isAuthLoading: false })
            
        }
    },
    connectSocket: async () => {
        try {
            const { user } = get()
            if (!user || get().socket?.connected) return

            const socket = io(SOCKET_BASE_URL, {
                query: {
                    userId: user._id
                }
            })
            socket.connect()
            set({ socket })

        } catch (error) {
            console.log(error);
            
        }
    },
    disConnectSocket: async () => {
        if (get().socket?.connected) {
            get().socket?.disconnect()
        }
    },
    updateProfile: async (data: FormData) => {
        try {
            const res = await axiosInstance.put('/api/v1/auth/update-profile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            set({ user: res.data });
        } catch (error) {
            console.log(error);
        }
    }
}))