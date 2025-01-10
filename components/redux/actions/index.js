// actions.js
export const setOptions = (options) => ({
    type: 'SET_OPTIONS',
    payload: options,
  });
  
  export const setRooms = (rooms) => ({
    type: 'SET_ROOMS',
    payload: rooms,
  });
  
  export const setInteriorType = (interiorType) => ({
    type: 'SET_INTERIOR_TYPE',
    payload: interiorType,
  });
  
  export const setCity = (city) => ({
    type: 'SET_CITY',
    payload: city,
  });
  