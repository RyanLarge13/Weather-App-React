import { useState, useEffect } from "react";
import Axios from "axios";
import "./news.scss";

const News = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    Axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&pageSize=3&apiKey=ff3d6a14008e4181b4ea4dfaac4a1da3"
    )
      .then((res) => {
        setNews(res.data.articles);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <section className="news">
      {news &&
        news.map((article) => (
          <div
            key={article.source.id}
            onClick={() => (window.location.href = article.url)}
            className="article"
          >
            <p>{article.title.split("-")[0]}</p>
            <p> - {article.title.split("-")[1]}</p>
          </div>
        ))}
    </section>
  );
};

export default News;
