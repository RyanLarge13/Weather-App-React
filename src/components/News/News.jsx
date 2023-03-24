import { useState, useEffect } from "react";
import Axios from "axios";
import "./news.scss";

const News = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    Axios.get(
      "https://api.thenewsapi.com/v1/news/all?api_token=YUI4Vf60MjQUdG1dcD32RhudQP1fHnenZZ4Bm6NM&language=en&limit=3"
    )
      .then((res) => {
        setNews(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <section className="news">
      {news &&
        news.map((article) => (
          <div
            key={article.uuid}
            onClick={() => (window.location.href = article.url)}
            className="article"
          >
            <p>{article.title}</p>
          </div>
        ))}
    </section>
  );
};

export default News;
