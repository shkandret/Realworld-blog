import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  applyMiddleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
