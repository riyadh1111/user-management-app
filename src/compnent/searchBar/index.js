import React from 'react';
import "./index.css"
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ setQuery }) => {
  const handleSearchChange = (e) => {
    setQuery(e.target.value); 
  };
  return (
    <div className='input-with-icon'>
    <input
      className='searchBar'
      type="text"
      placeholder="Search by name or username"
      onChange={handleSearchChange}
    />
    <CiSearch className="search-icon" />

    </div>
  );
};

export default SearchBar;
