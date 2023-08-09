import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import axios from "axios";

const SavedArticle = ({ state }) => {
  const [articles, setArticles] = useState([]);

  const loadArticles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/articles/savedarticles",
        {
          params: {
            user: state.user.id,
          }
        }
      );
      setArticles(response.data);
      // console.log(state.user.id,response.data)
      console.log(articles);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    loadArticles();
    /* eslint-disable */
  }, []);

  return (
    <div className="container">
      <div className="row">
        {articles.map((element, index) => (
          <div className="col-md-4" key={index}>
            <NewsItem
              title={element.title ? element.title : ""}
              description={element.description ? element.description : ""}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source={element.source ? element.source : "Unknown Source"}
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
