import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Results = ({ supabase }) => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  console.log("Search Query:", searchQuery);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          let query = supabase.from('sustainability_stats').select('*');
          const { data, error } = await query;
          if (error) throw error;

          const filteredData = data.filter((item) =>
            item.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.alternative_search_terms.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setData(filteredData);

          if (filteredData.length > 0) {
            const dataToSummarize = `
              Company Name: ${filteredData[0].company_name}
              Industry: ${filteredData[0].industry}
              Environmental Initiatives: ${filteredData[0].environmental_initiatives}
              Product Sustainability: ${filteredData[0].product_sustainability}
              Social Impact: ${filteredData[0].social_impact}
            `;

            const response = await fetch('http://localhost:5001/summarize', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ data: dataToSummarize }),
            });

            const result = await response.json();
            if (result.summary) {
              setSummary(result.summary);
            } else {
              throw new Error('Failed to generate summary');
            }
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [searchQuery, supabase]);

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-center text-gray-800 text-lg mb-4">
          <p>Error: {error}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
        >
          Back to Homepage
        </button>
      </div>
    );

  if (!searchQuery) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-center text-gray-800 text-lg mb-4">
          <p>No search term provided.</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
        >
          Back to Homepage
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-center text-gray-800 text-lg mb-4">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-center text-gray-800 text-lg mb-4">
          <p>{`Sorry, we don't have sustainability data on "${searchQuery}" for now.`}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
        >
          Back to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <h2 className="mb-8 text-2xl font-semibold">
        {`Results for: ${searchQuery}`}
      </h2>

      {summary ? (
        <div className="result-item mb-8 p-6 border border-gray-300 rounded-lg max-w-2xl w-full bg-white shadow-md">
          <h3 className="text-xl font-bold mb-6 text-green-600">{data[0].company_name}</h3>
          <div className="whitespace-pre-wrap">{summary}</div>
        </div>
      ) : (
        <p>No summary available.</p>
      )}

      <button
        onClick={() => navigate('/')}
        className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default Results;