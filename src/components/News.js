import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    setloading(true);
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${page}&pageSize=${props.pagesize}`;
    setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setloading(false);
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsSphere`;
    updateNews();
    /* eslint-disable */
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${nextPage}&pageSize=${props.pagesize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData);
    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
    setpage(nextPage);
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px" }}>
        NewsSphere - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    setSignedin={props.setSignedin}
                    signedin={props.signedin}
                    state={props.state}
                    content={element.content}
                    articles={articles} setarticles={setarticles}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;

News.defaultProps = {
  country: "in",
  pagesize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pagesize: PropTypes.number,
};
