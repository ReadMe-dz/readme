import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import errorReducer from './error.reducer';

const reducer = combineReducers({
  user: userReducer,
  error: errorReducer,
});

export default reducer;
