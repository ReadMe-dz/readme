import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import msgReducer from './msg.reducer';
import bookReducer from './book.reducer';

const reducer = combineReducers({
  user: userReducer,
  msg: msgReducer,
  book: bookReducer,
});

export default reducer;
