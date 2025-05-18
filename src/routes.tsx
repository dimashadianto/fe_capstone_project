import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/user/register';
import LoginPage from './pages/user/login';
import ResetPasswordPage from './pages/user/reset-password';
import HomePage from './pages/home';
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
    </Routes>
  )
}

export default AppRoutes;
