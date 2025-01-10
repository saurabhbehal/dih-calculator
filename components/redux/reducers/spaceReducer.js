// secondStepReducer.js
const initialState = {
    
    'Master Bedroom': 1,
    'Bedroom': 1,
    'Living and Dining': 1,
    'Kitchen': 1, 
    'Bathroom': 1,
    'Mandir Room': 0,
    'Study Room': 0,
    'Living Room':0,
    'Dining Area': 0,
    'Store Room': 0,
    'Servant Room': 0,
    'Passage': 0,
    'Balcony': 0,
    'Entrance Lobby': 0,
   
  };
  
  const spaceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT_SPACE':
        return {
          ...state,
          [action.payload.spaceName]: (state[action.payload.spaceName] || 0) + 1,
        };
      case 'DECREMENT_SPACE':
        return {
          ...state,
          [action.payload.spaceName]: Math.max((state[action.payload.spaceName] || 0) - 1, 0),
        };
      case 'SET_SPACE_COUNTS':
        return {
          ...state,
          ...action.payload,
        };
      case 'SET_SPACE_AREAS':
        return {
          ...state,
          areas: { ...state.areas, ...action.payload },
      };
      default:
        return state;
    }
  };
  
  export default spaceReducer;
  