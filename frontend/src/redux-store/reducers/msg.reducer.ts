import { SET_MSG, LOADING, CLEAR_MSG } from '../types';

const initialState = {
  loading: false,
  content: null,
  type: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_MSG:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };

    case CLEAR_MSG:
      return {
        ...state,
        loading: false,
        content: null,
        type: null,
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
