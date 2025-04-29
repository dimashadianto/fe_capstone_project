import { LoginReq, RegisterReq, ResetPasswordReq } from "../models/user_model"
import api from "./api"

export const register = async (data: RegisterReq) => {
    return api.post('/user/register', data)
}

export const login = async (data: LoginReq) => {
    return api.post('/user/login', data)
}

export const resetPassword = async (data: ResetPasswordReq) => {
    return api.post('/user/reset-password', data)
}
