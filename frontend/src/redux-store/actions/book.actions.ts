import {
  SELECT_BOOK,
  LOADING_BOOK,
  CLEAR_LOADING_BOOK,
  SEARCH_BOOK,
} from '../types';

export const loadingBook = (loading: boolean): any => (dispatch: any) => {
  dispatch({ type: loading ? LOADING_BOOK : CLEAR_LOADING_BOOK });
};

export const searchBook = (payload: string): any => (dispatch: any) => {
  dispatch({ type: SEARCH_BOOK, payload });
};

export const selectBook = (payload: string): any => (dispatch: any) => {
  dispatch({ type: SELECT_BOOK, payload });
};
