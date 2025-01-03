import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/News.css';

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=0b1ef9fc4f7b4b72a587d9fece2df1bf`);
        if (response.data.articles) setArticles(response.data.articles);
        else throw new Error('No articles found');
      } catch {
        setError('Failed to fetch news.');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h1>Live News</h1>
      <button className="close-button" onClick={() => navigate('/')}>✖️</button>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !articles.length && <p>No articles available.</p>}
      <div className="news-grid">
        {articles.map((article, index) => (
          <div className="news-card" key={index}>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="article-image" />}
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
