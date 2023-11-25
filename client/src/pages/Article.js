import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./article.css";

function Article() {
  const [article, setArticle] = useState({});
  const location = useLocation();

  useEffect(() => {
    setArticle(location.state && location.state.Data);
    console.log("This is article", article);
  }, [location.state, article]);

  return (
    <div className="main__Container">
      <div className="main__header">
        <h2 className="main__title">{article.title}</h2>
        <img className="main__image" src={article.urlToImage} alt="Article" />
      </div>
      <div className="main__info">
        <p className="infoAuthor">Author: {article.author}</p>
        <p className="infoAuthor">Published At: {article.publishedAt}</p>
      </div>
      <div className="main__content">
        <p>{article.content.slice(0, 200)} </p>
      </div>
      <div className="main__button">
        <button type="button" class="btn buttonA btn-outline-primary">
          Get Full Article
        </button>
      </div>
    </div>
  );
}

export default Article;
