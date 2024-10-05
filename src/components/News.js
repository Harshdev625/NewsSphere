import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({
  country = "us",
  pagesize = 8,
  category = "general",
  setProgress,
  signedin,
  state,
  setSignedin,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchNews = async (pageNum) => {
    setLoading(true);
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${pageNum}&pageSize=${pagesize}`;

    try {
      const response = await fetch(url);
      const parsedData = await response.json();
      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsSphere`;
    fetchNews(page);
    // eslint-disable-next-line
  }, [page]);

  const fetchMoreData = () => {
    if (articles.length < totalResults) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px" }}>
        NewsSphere - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={article.title || ""}
                  description={article.description || ""}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source.name}
                  setSignedin={setSignedin}
                  signedin={signedin}
                  state={state}
                  content={article.content}
                  articles={articles}
                  setArticles={setArticles}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
