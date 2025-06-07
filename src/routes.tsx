import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/user/register";
import LoginPage from "./pages/user/login";
import ResetPasswordPage from "./pages/user/reset-password";
import HomePage from "./pages/home";
import WorkoutCategoriesPage from "./pages/workout/WorkoutCategoriesPage";
import WorkoutPlansPage from "./pages/workout/WorkoutPlansPage";
import WorkoutExercisesPage from "./pages/workout/WorkoutExercisesPage";
import ArticlePage from './pages/article'
// @ts-ignore
import ArticleDetail from './pages/article/ArticleDetail';

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
    </Routes>
  );
}

export default AppRoutes;
