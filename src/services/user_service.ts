import { LoginReq, RegisterReq, ResetPasswordReq } from "../models/user_model"
import api from './api';

export interface Reminder {
  reminder_id?: number;
  user_id: number;
  message: string;
  time: string;
}

// GET semua reminder
export const getReminders = async () => {
  const response = await api.get('/remind');
  return response.data;
};

// POST buat reminder baru
export const createReminder = async (data: Reminder) => {
  console.log(data)
  const response = await api.post('/remind', data);
  return response.data;
};

// PUT update reminder berdasarkan id
export const updateReminder = async (id: number, data: { message: string; time: string }) => {
  const response = await api.put(`/update?id=${id}`, data);
  return response.data;
};

// DELETE reminder berdasarkan id
export const deleteReminder = async (id: number) => {
  const response = await api.delete(`/delete?id=${id}`);
  return response.data;
};


export const register = async (data: RegisterReq) => {
    return api.post('/user/register', data)
}

export const login = async (data: LoginReq) => {
    return api.post('/user/login', data)
}

export const resetPassword = async (data: ResetPasswordReq) => {
    return api.post('/user/reset-password', data)
}