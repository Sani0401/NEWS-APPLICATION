import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./article.css";

function Article() {
  const [article, setArticle] = useState({});
  const [user, setUser] = useState("");
  const location = useLocation();

  useEffect(() => {
    setUser(location.state && location.state.uData);
    setArticle(location.state && location.state.Data);
  }, [location.state]);

  const handleClick = () => {
    axios
      .post("http://localhost:3001/addArticle", { article, userId: user })
      .then((response) => {
        console.log("Article saved successfully", response.data);
      })
      .catch((error) => {
        console.error("Error saving article", error.message);
      });
  };

  return (
    <div className="main__container">
      <div className="main__card">
        <div className="main__header">
          <h2 className="main__title">{article.title}</h2>
          <img className="main__image" src={article.urlToImage} alt="Article" />
        </div>
        <div className="main__info">
          <p className="infoAuthor">Author: {article.author}</p>
          <p className="infoAuthor">
            Date: {article.publishedAt && article.publishedAt.slice(0, 10)}
          </p>
        </div>
        <div className="main__content">
          <p>{article.content || "No content available"} </p>
        </div>
        <div className="main__button">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn buttonA btn-outline-primary"
          >
            Get Full Article
          </a>
          <button
            className="btn buttonA btn-outline-primary"
            onClick={handleClick}
          >
            Save Article
          </button>
        </div>
      </div>
    </div>
  );
}

export default Article;
