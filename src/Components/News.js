
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import InfiniteScroll from 'react-infinite-scroll-component';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import Spinner and NewsItem components if not already imported

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    document.title = `News Monkey-${props.category}`;
    updateNews();
  }, [page, props.category]);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=32465fa9a1ff4b8da62e43d16c96d5ff&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);

    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
      console.log(parsedData.articles);
      console.log(url);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handlePrev = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "30px 0px" }}>News Monkey - Top headlines of {props.category}</h1>
      {loading && <Spinner />}
      <div className="container">
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 40) : ""}
                description={element.description ? element.description.slice(0, 60) : ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrev}>&larr; Previous</button>
          <button disabled={(page + 1 > Math.ceil(totalResults / props.pageSize))} type="button" className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
        </div>
      </div>
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func, // Make sure to adjust the prop type based on your implementation
};

export default News;
