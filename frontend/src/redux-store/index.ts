import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import composeEnhancers from './utils';
import reducer from './reducers';

const initialState = {};

const logger = createLogger({
  collapsed: true,
  diff: true,
});

const middlewares = [thunk, logger];

const ReduxStore = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(...middlewares), composeEnhancers)
);
export default ReduxStore;
