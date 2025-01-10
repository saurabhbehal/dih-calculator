// reducers/index.js
import { combineReducers } from 'redux'
import firstStepReducer from './firstStepReducer' // Import your first step reducer
import secondStepReducer from './secondStepReducer' // Import your first step reducer
import spaceReducer from './spaceReducer'

const rootReducer = combineReducers({
  firstStep: firstStepReducer,
  secondStep: secondStepReducer,
  space: spaceReducer,

  // Add other reducers as needed
})

export default rootReducer
