"use client"; // Ensure this file is treated as a client-side component

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SpaceContext = createContext();

export const SpaceProvider = ({ children }) => {
  const [spaceCounts, setSpaceCounts] = useState({});

  // Initialize spaceCounts from localStorage when client-side rendering
  useEffect(() => {
    const storedSpaceCounts = JSON.parse(window.localStorage.getItem('spaceCounts')) || {};
    setSpaceCounts(storedSpaceCounts);
  }, []); // Only run once on mount

  const updateSpaceCounts = (newCounts) => {
    setSpaceCounts(newCounts);
    if (typeof window !== "undefined") {
      window.localStorage.setItem('spaceCounts', JSON.stringify(newCounts));
    }
  };

  return (
    <SpaceContext.Provider value={{ spaceCounts, updateSpaceCounts }}>
      {children}
    </SpaceContext.Provider>
  );
};

export const useSpaceContext = () => useContext(SpaceContext);