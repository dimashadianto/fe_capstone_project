import { useEffect, useState } from 'react';
import { fetchArticles } from '../../services/article_service';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';  // import Navbar

interface Article {
  id: number;
  title: string;
  content: string;
  category_id: number;
  category_name?: string;
  author_name: string;
  published_date: string;
  image_url: string;
}

const ArticlePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error('Gagal mengambil artikel:', error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Navbar />  
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Daftar Artikel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((article) => (
            <div key={article.id} className="border rounded-lg p-4 shadow">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{article.title}</h2>
              <p className="text-gray-600 text-sm">
                Oleh {article.author_name} - {article.published_date}
              </p>
              <p className="mt-2 text-sm text-gray-800">
                {article.content.slice(0, 100)}...
              </p>
              <p className="text-sm text-gray-600">
                Kategori: <strong>{article.category_name || 'Tanpa Kategori'}</strong>
              </p>

              <Link
                to={`/articles/${article.id}`}
                className="text-blue-600 text-sm font-semibold mt-2 inline-block hover:underline"
              >
                Baca selengkapnya →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
