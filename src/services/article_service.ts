import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/articles';

export const fetchArticles = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data.articles;
};
