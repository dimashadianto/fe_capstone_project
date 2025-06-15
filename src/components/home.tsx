import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";

export interface Article {
  id: number;
  title: string;
  content: string;
  image_url: string;
  category_name: string;
  published_date: string;
}

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/articles");
        const json = await res.json();
        const data: Article[] = json.articles;

        setArticles(data);

        const latestWithImages = data
          .filter((item) => item.image_url && item.published_date)
          .sort(
            (a, b) =>
              new Date(b.published_date).getTime() -
              new Date(a.published_date).getTime()
          )
          .slice(0, 5);

        const imageUrls = latestWithImages.map((item) => item.image_url);
        setImages(imageUrls);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
    <Navbar/>
    <div className="bg-gray-100 bg-gradient-to-r from-white to-blue-200">
      <div className="relative w-full h-[600px] overflow-hidden">
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 cursor-pointer rounded-full ${ i === current ? "bg-blue-600 scale-125" : "bg-gray-400" } transition-all`}
            />
          ))}
        </div>
      </div>

      <section className="py-4 px-4 max-w-6xl ml-0">
        <h2 className="text-2xl font-semibold mb-4">Artikel Terbaru</h2>
        <div className="space-y-6">
          {articles.map((article, index) => (
            <div key={article.id}>
              <div className="flex gap-4">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-52 h-36 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="text-sm text-teal-600 space-x-2">
                    <span>{article.category_name}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-1">
                    <Link to={`/articles/${article.id}`} className="hover:text-blue-600 hover:underline">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-gray-700 line-clamp-2">
                    {article.content.slice(0, 200)}...
                  </p>
                </div>
              </div>

              {/* GARIS PEMBATAS */}
              {index !== articles.length - 1 && (
                <div className="h-[1px] bg-gray-300 my-4 mx-2 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;
