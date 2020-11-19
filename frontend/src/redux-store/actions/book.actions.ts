import { SELECT_BOOK, LOADING_BOOK } from '../types';

export const loadingBook = (): any => (dispatch: any) => {
  dispatch({ type: LOADING_BOOK });
};

export const selectBook = (payload: any): any => (dispatch: any) => {
  dispatch({
    type: SELECT_BOOK,
    payload,
  });
};
