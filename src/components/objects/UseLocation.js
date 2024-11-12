import React from 'react'
import { useLocation } from 'react-router-dom';

const UseLocation = () => {
    const location = useLocation();

    // Access pathname
    const currentPath = location.pathname;
  
    // Access search (query string)
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('param'); // e.g., ?param=value
  
    return (
      <div>
        <h2>Current Path: {currentPath}</h2>
        {queryParam && <p>Query Parameter "param": {queryParam}</p>}
      </div>
    );
  }

export default UseLocation