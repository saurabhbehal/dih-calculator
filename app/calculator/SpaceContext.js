// SpaceContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
const SpaceContext = createContext();

export const SpaceProvider = ({ children }) => {
  const storedSpaceCounts = JSON.parse(localStorage.getItem('spaceCounts')) || {};
  const [spaceCounts, setSpaceCounts] = useState(storedSpaceCounts);

  const updateSpaceCounts = (newCounts) => {
    setSpaceCounts(newCounts);
    localStorage.setItem('spaceCounts', JSON.stringify(newCounts));
  };

  return (
    <SpaceContext.Provider value={{ spaceCounts, updateSpaceCounts }}>
      {children}
    </SpaceContext.Provider>
  );
};

export const useSpaceContext = () => useContext(SpaceContext);
