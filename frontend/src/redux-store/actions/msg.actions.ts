import { CLEAR_MSG, SET_MSG } from '../types';

export const clearMsg = (): any => (dispatch: any) => {
  dispatch({ type: CLEAR_MSG });
};

export const setMsg = (payload: any): any => (dispatch: any) => {
  dispatch({
    type: SET_MSG,
    payload,
  });
};
