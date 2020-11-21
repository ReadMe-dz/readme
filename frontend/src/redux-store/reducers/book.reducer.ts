import {
  SELECT_BOOK,
  LOADING_BOOK,
  CLEAR_LOADING_BOOK,
  SEARCH_BOOK,
  BOOK_COUNT,
} from '../types';

const initialState = {
  loading: false,
  search: '',
  id: '',
  count: 0,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SELECT_BOOK:
      return {
        ...state,
        loading: false,
        id: action.payload,
      };

    case SEARCH_BOOK:
      return {
        ...state,
        search: action.payload,
      };

    case LOADING_BOOK:
      return {
        ...state,
        loading: true,
      };

    case CLEAR_LOADING_BOOK:
      return {
        ...state,
        loading: false,
      };

    case BOOK_COUNT:
      return {
        ...state,
        count: action.payload,
      };

    default:
      return state;
  }
}
