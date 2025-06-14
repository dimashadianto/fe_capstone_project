import { useEffect, useState } from 'react';
import { fetchArticles } from '../../services/article_service';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

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

  //Ambil semua nama kategori 
  const categories = Array.from(
    new Set(articles.map((a) => a.category_name || 'Tanpa Kategori'))
  );

  //  Filter  search dan kategori
  const filteredArticles = articles.filter((article) => {
    const matchSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === 'Semua' || article.category_name === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <>
      <Navbar />
      <div className="p-4 bg-gradient-to-r from-white to-blue-200">
        <h1 className="text-2xl font-bold mb-4">Daftar Artikel</h1>

        {/* 🔍 Search & Dropdown */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 ">
          <input
            type="text"
            placeholder="Cari berdasarkan judul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded w-full md:w-1/2 bg-white"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded w-full md:w-1/3 bg-white"
            title="Pilih kategori artikel"  
          >
            <option value="Semua">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((article) => (
            <div key={article.id} className="border rounded-lg p-4 shadow bg-white">
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

        {filteredArticles.length === 0 && (
          <p className="text-center text-gray-500 mt-6">Artikel tidak ditemukan.</p>
        )}
      </div>
    </>
  );
};

export default ArticlePage;
