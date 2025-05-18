import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/articles')
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((err) => {
        console.error('Gagal mengambil artikel:', err);
      });
  }, []);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Daftar Artikel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <Link
              to={`/articles/${article.id}`}
              key={article.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={article.image_url}
                alt={article.title}
                className="rounded-xl h-40 w-full object-cover mb-2"
              />
              <h2 className="text-lg font-semibold mb-1">{article.title}</h2>
              <p className="text-sm text-gray-600 mb-1">
                Kategori: {article.category_name || 'Tanpa Kategori'}
              </p>
              <p className="text-sm text-gray-500">Penulis: {article.author_name}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ArticleList;
