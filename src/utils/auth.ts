import { jwtDecode } from 'jwt-decode';
import api from './../services/api';

export function scheduleTokenCheck() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const tokenPayload = jwtDecode(token) as { exp: number };

    const now = Date.now();
    const tokenExpiryTime = tokenPayload.exp * 1000;
    const timeUntilExpiry = tokenExpiryTime - now;

    setTimeout(() => {
        refreshToken();
    }, Math.max(timeUntilExpiry - 1000, 0));
}

function refreshToken() {
    api.post('/user/refresh-token')
        .then(res => {
            const newToken = res.data.accessToken;
            localStorage.setItem('token', newToken);
            scheduleTokenCheck();
        })
        .catch(() => {
            localStorage.removeItem('user');
            alert('Sesi Anda telah berakhir. Silakan login kembali.');
        });
}

export function logout() {
  api.post('/user/logout')
    .finally(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    });
}
