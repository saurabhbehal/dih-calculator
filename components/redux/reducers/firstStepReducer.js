// reducers/firstStepReducer.js
import {
    SET_OPTION_SET1,
    SET_OPTION_SET2,
    SET_OPTION_SET3,
    SET_OPTION_SET4,
    SET_TEXT_INPUT,
  } from '../actions/actionTypes';
  
  const initialState = {
    selectedOptionSet1: null,
    selectedOptionSet2: null,
    selectedOptionSet3: null,
    selectedOptionSet4: null,
    textInput: '',
  };
  
  const firstStepReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_OPTION_SET1:
        return { ...state, selectedOptionSet1: action.payload };
      case SET_OPTION_SET2:
        return { ...state, selectedOptionSet2: action.payload };
      case SET_OPTION_SET3:
        return { ...state, selectedOptionSet3: action.payload };
      case SET_OPTION_SET4:
        return { ...state, selectedOptionSet4: action.payload };
      case SET_TEXT_INPUT:
        return { ...state, textInput: action.payload };
      default:
        return state;
    }
  };
  
  export default firstStepReducer;
  