import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar'; 

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/articles/${id}`)
      .then((res) => {
        setArticle(res.data.article);
      })
      .catch((err) => {
        console.error('Gagal mengambil detail artikel:', err);
      });
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-white to-blue-200">
        <div className="max-w-3xl mx-auto p-4">
          <img src={article.image_url} alt={article.title} className="w-full h-64 object-cover rounded-xl mb-4" />
          <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <p className="text-sm font-semibold text-gray-800">
              Kategori: {article.category_name} | Penulis: {article.author_name}
            </p>
            <p className="text-sm font-semibold text-gray-700 mt-1">
              Tanggal Publikasi: {new Date(article.published_date).toLocaleDateString()}
            </p>
          </div>

          <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }} />
        </div>
      </div>
    </>
  );

}
export default ArticleDetail;
