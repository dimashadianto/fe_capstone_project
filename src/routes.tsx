
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/user/register";
import LoginPage from "./pages/user/login";
import ResetPasswordPage from "./pages/user/reset-password";
import HomePage from "./pages/home";
import WorkoutCategoriesPage from "./pages/workout/WorkoutCategoriesPage";
import WorkoutPlansPage from "./pages/workout/WorkoutPlansPage";
import WorkoutExercisesPage from "./pages/workout/WorkoutExercisesPage";
import ArticlePage from './pages/article'
import SleepReminder from './components/reminder/sleep';
import EatReminder from './components/reminder/eat';
import DrinkReminder from './components/reminder/drink';
import ReminderPage from "./components/reminder/page";
// @ts-ignore
import ArticleDetail from './pages/article/ArticleDetail';
import BMICalorieCalculator from './pages/calculator/bmiCalorieCalculator';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/artikel" element={<ArticlePage />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      <Route path="/workout-categories" element={<WorkoutCategoriesPage />} />
      <Route path="/workout-plans/:id" element={<WorkoutPlansPage />} />
      <Route path="/workout-exercises/:id" element={<WorkoutExercisesPage />} />
      <Route path="/calculator" element={<BMICalorieCalculator />} />
      <Route path="/reminder" element={<ReminderPage />} />
      <Route path="/reminder/sleep" element={<SleepReminder />} />
      <Route path="/reminder/eat" element={<EatReminder />} />
      <Route path="/reminder/drink" element={<DrinkReminder />} />
    </Routes>
  );
}

export default AppRoutes;
