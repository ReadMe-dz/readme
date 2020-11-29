import axios from 'axios';
import { SET_USER, SET_MSG, SET_UNAUTHENTICATED, LOADING_USER } from '../types';

const { REACT_APP_BASE_URL } = process.env;

export const loadingUser = (): any => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
};

export const loginUser = (user: any) => (dispatch: any) => {
  dispatch({ type: SET_USER, payload: user });
};

export const getUser = (): any => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  axios
    .get(`${REACT_APP_BASE_URL}/users`)
    .then((res) => {
      const { user } = res.data;
      dispatch({
        type: SET_USER,
        payload: user,
      });
    })
    .catch((err) => {
      const {
        response: {
          data: { message },
        },
      } = err;

      dispatch({
        type: SET_MSG,
        payload: message,
      });
    });
};

export const logoutUser = (): any => (dispatch: any) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common.Authorization;
  dispatch({ type: SET_UNAUTHENTICATED });
};
