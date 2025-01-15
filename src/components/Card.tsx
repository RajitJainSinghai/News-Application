import fallback from "../assets/img/newspaper.avif"; // Import the fallback image

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

interface CardProps {
  data: Article[];
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className='card_division'>
      {/* Render Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((article, index) => (
          <div key={index} className="border p-4 rounded-md shadow-md">
            {/* Article Image */}
            <img
              src={article.urlToImage || fallback} // Use fallback if no URL
              alt={article.title}
              className="w-full h-48 object-cover rounded-md"
              onError={(e) => {
                // Fallback to alternate image if original fails
                (e.target as HTMLImageElement).src = fallback;
              }}
            />
            {/* Article Details */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold cursor-pointer no-underline hover:underline ..."><a href={article.url}>{article.title}</a></h2>
              <span className='flex justify-between'>
              <p className="text-sm text-gray-500">{article.source.name}</p>
              <p className="text-sm text-gray-400">{new Date(article.publishedAt).toLocaleDateString()}</p>
              </span>
              <p className="text-sm mt-2">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 block"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
