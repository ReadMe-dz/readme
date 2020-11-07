import axios from 'axios';
import { generateMessage, msgTypes } from '../../utils/msgs';
import {
  SET_USER,
  SET_MSG,
  LOADING,
  CLEAR_MSG,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from '../types';

const { REACT_APP_BASE_URL } = process.env;

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  dispatch({ type: LOADING });

  axios
    .post(`${REACT_APP_BASE_URL}/users/login`, userData)
    .then((res) => {
      const { user, token } = res.data;
      localStorage.setItem('token', `Bearer ${token}`);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: CLEAR_MSG });
      history.push('/');
    })
    .catch((err) => {
      const { response } = err;
      const payload = generateMessage(
        response && response.data ? msgTypes.AUTH_FAILED : msgTypes.NETWORK
      );
      dispatch({
        type: SET_MSG,
        payload,
      });
    });
};

export const getUserData = (): any => (dispatch: any) => {
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
      console.log(err);
    });
};

export const logoutUser = (): any => (dispatch: any) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common.Authorization;
  dispatch({ type: SET_UNAUTHENTICATED });
};
