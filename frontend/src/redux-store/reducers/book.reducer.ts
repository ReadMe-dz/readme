import {
  SELECT_BOOK,
  LOADING_BOOK,
  CLEAR_LOADING_BOOK,
  SEARCH_BOOK,
} from '../types';

const initialState = {
  loading: false,
  search: '',
  id: '',
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

    default:
      return state;
  }
}
