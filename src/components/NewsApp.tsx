import { useEffect, useState } from 'react';
import Card from './Card';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
  };
  publishedAt: string;
}

const NewsApp = () => {
  const [search, setSearch] = useState<string>('India');
  const [newsData, setNewsData] = useState<Article[] | null>(null);
  const [filteredData, setFilteredData] = useState<Article[] | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [publishedDates, setPublishedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('All');
  const [category, setCategory] = useState<string>('All');

  const API_KEY_NEWSAPI = 'af715420647d4f2c8c98aa7d45f82483';
  const API_KEY_NYT = 'kTjEaNq6I8sKZq2mNHeyTIau1gyL2x6b';
  const API_KEY_GUARDIAN = '136cb212-73e5-45db-be01-c88adf01c536';

  const getData = async () => {
    let articles: Article[] = [];
  
    try {
      // Fetch from NewsAPI
      if (category === 'All' || category === 'NewsAPI') {
        const newsAPIResponse = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(search)}&language=en&apiKey=${API_KEY_NEWSAPI}`
        ).then((res) => res.json());
        if (newsAPIResponse.articles) {
          articles = articles.concat(
            newsAPIResponse.articles
              .map((article: any) => ({
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                source: article.source,
                publishedAt: article.publishedAt,
              }))
              .filter(
                (article: { title: any; description: any; url: any; urlToImage: any; }) =>
                  article.title &&
                  article.description &&
                  article.url &&
                  article.urlToImage
              )
          );
        }
      }
  
      // Fetch from New York Times
      if (category === 'All' || category === 'New York Times') {
        const nytResponse = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(search)}&api-key=${API_KEY_NYT}`
        ).then((res) => res.json());
        if (nytResponse.response?.docs) {
          articles = articles.concat(
            nytResponse.response.docs
              .map((doc: any) => ({
                title: doc.headline.main,
                description: doc.abstract,
                url: doc.web_url,
                urlToImage: doc.multimedia?.[0]?.url || '',
                source: { name: 'New York Times' },
                publishedAt: doc.pub_date,
              }))
              .filter(
                (article: { title: any; description: any; url: any; urlToImage: any; }) =>
                  article.title &&
                  article.description &&
                  article.url &&
                  article.urlToImage
              )
          );
        }
      }
  
      // Fetch from The Guardian
      if (category === 'All' || category === 'The Guardian') {
        const guardianResponse = await fetch(
          `https://content.guardianapis.com/search?page=1&q=${encodeURIComponent(search)}&api-key=${API_KEY_GUARDIAN}&show-fields=trailText,thumbnail`
        ).then((res) => res.json());
        if (guardianResponse.response?.results) {
          articles = articles.concat(
            guardianResponse.response.results
              .map((result: any) => ({
                title: result.webTitle,
                description: result.fields?.trailText || '',
                url: result.webUrl,
                urlToImage: result.fields?.thumbnail || '',
                source: { name: 'The Guardian' },
                publishedAt: result.webPublicationDate,
              }))
              .filter(
                (article: { title: any; description: any; url: any; urlToImage: any; }) =>
                  article.title &&
                  article.description &&
                  article.url &&
                  article.urlToImage
              )
          );
        }
      }
  
      if (articles.length > 0) {
        setNewsData(articles);
        setFilteredData(articles);
  
        const uniqueSources: string[] = Array.from(new Set(articles.map((article: Article) => article.source.name)));
        setSources(uniqueSources);
  
        const uniqueDates: string[] = Array.from(
          new Set(articles.map((article: Article) => new Date(article.publishedAt).toISOString().split('T')[0]))
        );
        setPublishedDates(uniqueDates);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    getData();
  }, [category, search]);

  useEffect(() => {
    if (newsData) {
      let refinedData = newsData;

      if (selectedSource !== 'All') {
        refinedData = refinedData.filter((article) => article.source.name === selectedSource);
      }

      if (selectedDate !== 'All') {
        refinedData = refinedData.filter(
          (article) => new Date(article.publishedAt).toISOString().split('T')[0] === selectedDate
        );
      }

      setFilteredData(
        refinedData.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      );
    }
  }, [selectedSource, selectedDate, newsData]);

  return (
    <section className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 p-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-white text-xl font-bold">Innoscriptalogy</div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={getData}
          >
            Search
          </button>
        </div>
      </nav>

      <div className="filter_division">
        <div className='filter_box'>
          <label className="block text-sm font-medium text-gray-700">Select Category:</label>
          <select
            className="block w-full mt-1 px-3 py-2 border rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="NewsAPI">NewsAPI</option>
            <option value="New York Times">New York Times</option>
            <option value="The Guardian">The Guardian</option>
          </select>
        </div>
        <div className='filter_box'>
          <label className="block text-sm font-medium text-gray-700">Filter by Source:</label>
          <select
            className="block w-full mt-1 px-3 py-2 border rounded-md"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            <option value="All">All</option>
            {sources.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div className='filter_box'>
          <label className="block text-sm font-medium text-gray-700">Filter by Date:</label>
          <select
            className="block w-full mt-1 px-3 py-2 border rounded-md"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="All">All</option>
            {publishedDates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-4">
        {filteredData && filteredData.length > 0 ? (
          <Card data={filteredData} />
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </section>
  );
};

export default NewsApp;
