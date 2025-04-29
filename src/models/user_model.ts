export interface RegisterReq {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export interface LoginReq {
    email: string;
    password: string;
}

export interface ResetPasswordReq {
    email: string;
    password: string;
    confirmPassword: string;
}
