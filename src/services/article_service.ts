import axios from 'axios';
import api from './api';

const API_BASE_URL = 'http://localhost:8080/api/articles';

export const fetchArticles = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data.articles;
};

export const getArticles = async () => {
  return api.get("/articles");
};
