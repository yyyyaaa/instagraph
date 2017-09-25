import React from 'react';
import './style.css';

const SearchInput = ({ onChange, searchQuery, navigateDropList, handleEnter }) => (
  <input 
    className="input has-text-centered" 
    style={{
      outline: "none",
      boxShadow: "none",
    }}
    type="text" 
    placeholder="Search some shit..." 
    value={searchQuery}
    onChange={onChange}
    onKeyUp={navigateDropList}
    onKeyDown={navigateDropList}
    onKeyPress={handleEnter}
  />
);

export default SearchInput;
