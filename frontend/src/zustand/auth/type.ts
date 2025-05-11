
type user = {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
}

export type authState = {
    user: user | null;
    isAuthLoading: boolean;
    isLoginLoading: boolean;
    isSignupLoading: boolean;
    isLogoutLoading: boolean;
    signup: (data: { userName: string, email: string, password: string }) => Promise<void>;
    login: (data: { emailOrUserName: string, password: string }) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}



