import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import msgReducer from './msg.reducer';

const reducer = combineReducers({
  user: userReducer,
  msg: msgReducer,
});

export default reducer;
