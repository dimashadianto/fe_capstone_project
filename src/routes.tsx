import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/user/register';
import LoginPage from './pages/user/login';
import ResetPasswordPage from './pages/user/reset-password';
import HomePage from './pages/home';
import ReminderPage from "./components/reminder/page";
import SleepReminder from './components/reminder/sleep';
import EatReminder from './components/reminder/eat';
import DrinkReminder from './components/reminder/drink';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/reminder" element={<ReminderPage />} />
      <Route path="/reminder/sleep" element={<SleepReminder />} />
      <Route path="/reminder/eat" element={<EatReminder />} />
      <Route path="/reminder/drink" element={<DrinkReminder />} />
    </Routes>
  )
}

export default AppRoutes;
