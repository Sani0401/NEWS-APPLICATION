import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [article, setArticle] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const isInitialRender = useRef(true);
  const [userData, setUserData] = useState("");
  const handleSearch = async () => {
    console.log(
      "The logged user is: in the landing page",
      setUserData(location.state.userData)
    );
    try {
      const response = await axios.post("http://localhost:3001/search", {
        query,
      });

      // Assuming response.data.articles is an array of articles
      let filteredData = response.data.articles;

      // Filter data based on date
      if (dateFilter) {
        filteredData = filteredData.filter((article) =>
          article.publishedAt.includes(dateFilter)
        );
      }

      setData(filteredData);
      setFetched(true);
      console.log(filteredData);
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const handleCardClick = (clickedArticle) => {
    setArticle(clickedArticle);
  };

  useEffect(() => {
    // Skip the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    navigate("/Article", { state: { Data: article, uData: userData } });
  }, [article, navigate]);

  return (
    <>
      <div className="mainContainer">
        <div className="input">
          <input
            className="mainInput"
            placeholder="Enter your search query"
            onChange={(e) => setQuery(e.target.value)}
          />
          <input
            type="date"
            className="dateInput"
            onChange={(e) => setDateFilter(e.target.value)}
          />
          <button
            type="button"
            className="inputButton btn btn-secondary"
            onClick={handleSearch}
          >
            Search
          </button>
          <button className="btn buttonA btn-outline-primary">
            Saved Articles
          </button>
        </div>
      </div>
      {fetched && (
        <div className="displayData">
          <div className="dataContainer">
            {data.map((article, index) => (
              <div
                key={index}
                className="data_card"
                onClick={() => handleCardClick(article)}
              >
                {/* Render your article data here */}
                <img
                  className="data_img"
                  src={article.urlToImage}
                  alt="Loading"
                />
                <p className="data_description">
                  {article.description.slice(0, 100)}
                  {article.description.length > 50 && "..."}
                </p>
                <div className="buttonContainer">
                  <button
                    type="button"
                    className="data__button btn btn-outline-primary"
                  >
                    Read Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Landing;
