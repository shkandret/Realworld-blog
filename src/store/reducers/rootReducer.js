import { combineReducers } from 'redux';

import articleReducer from './articleReducer';
import userReducer from './userReduces';

const rootReducer = combineReducers({
  articleReducer,
  userReducer,
});

export default rootReducer;
