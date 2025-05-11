import { create } from 'zustand'
import type { authState } from './type'
import {axiosInstance} from '../../utils/axios'


export const useAuthStore = create<authState>((set) => ({
    user: null,
    isAuthLoading: false,
    isLoginLoading: false,
    isSignupLoading: false,
    isLogoutLoading: false,
    signup: async (data) => {
        try {
            
            set({ isSignupLoading: true })
            const res = await axiosInstance.post('/api/v1/auth/signup', data)
            set({ user: res.data })
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
            
        } catch (error) {
            console.log(error);
        } finally {
            set({isAuthLoading:false})
            
        }
     }
}))