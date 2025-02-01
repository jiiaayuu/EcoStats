import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import Search from './components/Search';
import Results from './components/Results';

// const SUPABASE_ANON_KEY = `${process.env.REACT_APP_SUPABASE_ANON_KEY}`;

const supabase = createClient("https://rtlvyljyvinhbifykpdr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bHZ5bGp5dmluaGJpZnlrcGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzNDYwOTksImV4cCI6MjA1MzkyMjA5OX0.sBq0_WC0ztk5WnSNCvL3sHyqFeOisgF6VIfm5M2R8zQ");

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search onSearchSubmit={handleSearchSubmit} />} />
        <Route path="/results" element={<Results searchQuery={searchQuery} supabase={supabase} />} />
      </Routes>
    </Router>
  );
};

export default App;
