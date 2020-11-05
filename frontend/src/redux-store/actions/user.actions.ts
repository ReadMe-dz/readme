import axios from 'axios';
import generateMessage from '../../utils/messages';
import {
  SET_USER,
  SET_ERRORS,
  LOADING,
  CLEAR_ERRORS,
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
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      const { response, message } = err;
      const payload = {
        message: generateMessage(
          response.data ? response.data.message : message
        ),
      };

      dispatch({
        type: SET_ERRORS,
        payload,
      });
    });
};

export const getUserData = (): any => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  setTimeout(() => {
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
  }, 2500);
};

export const logoutUser = (): any => (dispatch: any) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common.Authorization;
  dispatch({ type: SET_UNAUTHENTICATED });
};
