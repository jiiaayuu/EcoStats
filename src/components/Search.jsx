import React, { useState } from 'react';
import { ReactTyped } from 'react-typed';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (companyName.trim() === '') {
      console.log('Please enter a company or industry name.');
      return;
    }

    setLoading(true);
    setLoading(false);

    navigate(`/results?search=${companyName}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className='flex justify-center items-center md:text-6xl sm:text-5xl text-3xl font-bold md:py-6 mt-8'>
        <h1 className='text-green-600'>Eco</h1><h1 className='text-gray-700'>Stats</h1>
      </div>

      <div className='flex justify-center items-center mb-8'>
        <p className="text-2xl font-bold text-center text-gray-700">
          Look up for 
        </p>
        <ReactTyped 
          className="text-2xl font-semibold text-center text-gray-500 pl-2"
          strings={['Amazon', 'agriculture', 'Unilever', 'retailing', 'Philips', '... ']}
          typeSpeed={80}
          backSpeed={100}
          loop
        />
      </div>

      <div className="flex items-center space-x-4 mb-8 w-full sm:w-3/4 lg:w-2/3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Look up a company or an industry: "
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="p-2 w-full pr-12 pl-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>
        <button 
          onClick={handleSearch} 
          className="px-6 py-3 bg-green-600 text-white rounded-lg h-full"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default Search;
