import { compose } from 'redux';

declare global {
  interface Window {
    // eslint-disable-next-line no-underscore-dangle
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

// eslint-disable-next-line no-underscore-dangle
export default (window.__REDUX_DEVTOOLS_EXTENSION__ &&
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__()) as any;
