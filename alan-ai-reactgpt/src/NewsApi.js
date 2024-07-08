import { useState, useEffect } from "react";

const API_KEY = "97c5f88cea9e432589f989b07bfe0195";

const fetchNews = async (category, country) => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsAPI = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`);
        const data = await response.json();
        console.log(data); // <--- Add this line to see the API response data
        if (data.articles.length === 0) {
          setNews([]);
          setError("No article found");
        } else {
          setNews(data.articles);
          setError(null);
        }
      } catch (error) {
        console.error(error);
        setError("Error fetching news");
      }
    };
    fetchNewsAPI();
  }, [category, country]);

  return { news, error };
};

export default fetchNews;