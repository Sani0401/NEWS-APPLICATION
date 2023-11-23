import React, { useState } from "react";
import axios from "axios";
import "./Landing.css";

function Landing() {
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);

  const handleSearch = async () => {
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
        </div>
      </div>
      {fetched && (
        <div className="displayData">filteredData.map((data) => {})</div>
      )}
    </>
  );
}

export default Landing;
