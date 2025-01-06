import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUploadingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {

        } catch (error) {
            console.log(error);

        }
    }
}))