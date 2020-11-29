import axios from 'axios';
import jwtDecode from 'jwt-decode';
import store from '../redux-store';
import { logoutUser, getUser } from '../redux-store/actions/user.actions';
import { SET_AUTHENTICATED } from '../redux-store/types';

export default () => {
  const authToken = localStorage.token;
  if (authToken) {
    const decodedToken: any = jwtDecode(authToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(logoutUser());
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common.Authorization = authToken;
      store.dispatch(getUser());
    }
  }
};
