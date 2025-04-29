import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/user/register';
import LoginPage from './pages/user/login';
import ResetPasswordPage from './pages/user/reset-password';
import HomePage from './pages/home';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default AppRoutes;
