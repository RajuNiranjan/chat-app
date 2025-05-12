import {Socket} from 'socket.io-client'
export type user = {
    _id: string;
    userName: string;
    email: string;
    profilePicture: string;
    createdAt: string;
}

export type authState = {
    user: user | null;
    isAuthLoading: boolean;
    isLoginLoading: boolean;
    isSignupLoading: boolean;
    isLogoutLoading: boolean;
    socket: Socket | null;
    signup: (data: { userName: string, email: string, password: string }) => Promise<void>;
    login: (data: { emailOrUserName: string, password: string }) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    connectSocket: () => Promise<void>;
    disConnectSocket: () => Promise<void>;
}



