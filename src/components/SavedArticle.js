import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const SavedArticle = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  let userId = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id;
  }

  const loadArticles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/articles/savedarticles",
        {
          params: {
            user: userId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArticles(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to load articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadArticles();
    } else {
      setError("User not authenticated. Please log in.");
      setLoading(false);
    }
    // eslint-disable-next-line 
  }, [userId]);

  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {articles.map((element) => (
          <div className="col-md-4" key={element._id}>
            <NewsItem
              title={element.title || ""}
              description={element.description || ""}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source={element.source || "Unknown Source"}
              _id={element._id}
              articles={articles}
              setArticles={setArticles}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedArticle;
