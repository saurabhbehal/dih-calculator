// actions/firstStepActions.js
import {
    SET_OPTION_SET1,
    SET_OPTION_SET2,
    SET_OPTION_SET3,
    SET_OPTION_SET4,
    SET_TEXT_INPUT,
  } from './actionTypes';
  
  export const setOptionSet1 = (option) => ({
    type: SET_OPTION_SET1,
    payload: option,
  });
  
  export const setOptionSet2 = (option) => ({
    type: SET_OPTION_SET2,
    payload: option,
  });
  
  export const setOptionSet3 = (option) => ({
    type: SET_OPTION_SET3,
    payload: option,
  });
  
  export const setOptionSet4 = (option) => ({
    type: SET_OPTION_SET4,
    payload: option,
  });
  
  export const setTextInput = (text) => ({
    type: SET_TEXT_INPUT,
    payload: text,
  });
  