// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // You'll create this file later


const store = createStore(
  rootReducer,
  // Add middleware or enhancers if needed
);

export default store;
