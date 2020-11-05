import { CLEAR_ERRORS } from '../types';

export const clearErrors = (): any => (dispatch: any) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const x = 7;
