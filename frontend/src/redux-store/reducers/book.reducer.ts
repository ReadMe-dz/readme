import { SELECT_BOOK, LOADING_BOOK } from '../types';

const initialState = {
  loading: false,
  id: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SELECT_BOOK:
      return {
        ...state,
        loading: false,
        id: action.payload,
      };

    case LOADING_BOOK:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
