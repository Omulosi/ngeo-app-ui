import axios from 'axios';
import { mutate } from 'swr';
import BASE_URL from 'src/config';
/* eslint-disable */
import { SIGNIN, LOGOUT, LOADING_USER, SET_ERRORS } from '../types';

/* eslint-ignore */
export const signUp = (
  { firstName, lastName, email, password, role },
  navigate,
  enqueueSnackbar,
  setSubmitting
) => (dispatch) => {
  axios
    .post(`${BASE_URL}/auth/signup`, {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      role
    })
    .then(() => {
      navigate('/login', { replace: true });
      enqueueSnackbar('Successfully signed up!', { variant: 'success' });
      setSubmitting(false);
    })
    .catch((err) => {
      let errorMsg = 'Error signing up.';

      // Get the first error message
      if (err.response.status !== 404 && err.response && err.response.data) {
        for (let k in err.response.data) {
          errorMsg = err.response.data[k];
          break;
        }
        errorMsg = errorMsg[0].detail;
      }

      errorMsg = errorMsg.toLocaleLowerCase();
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      setSubmitting(false);
      console.log(err);
    });
};

export const login = (
  { email, password },
  navigate,
  enqueueSnackbar,
  setSubmitting
) => (dispatch) => {
  axios
    .post(`${BASE_URL}/auth/login`, {
      email,
      password
    })
    .then(({ data }) => {
      const { user } = data;
      const { token } = user;
      localStorage.setItem('token', `${token}`);
      navigate('/app/dashboard', { replace: true });
      enqueueSnackbar(data.message, { variant: 'success' });
      setSubmitting(false);
      dispatch({ type: SIGNIN });
    })
    .catch((err) => {
      let errorMsg = 'Error logging in';
      // Get the first error message
      /* eslint-ignore */
      if (
        err.response &&
        err.response.status !== 404 &&
        err.response &&
        err.response.data
      ) {
        for (let k in err.response.data) {
          errorMsg = err.response.data[k];
          break;
        }
      }
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      console.log(`${err} => ${errorMsg}`);
      setSubmitting(false);
    });
};

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.setItem('reduxState', null);
  mutate(`${BASE_URL}/regions`);
  mutate(`${BASE_URL}/counties`);
  mutate(`${BASE_URL}/sublocations`);
  dispatch({ type: LOGOUT });
  navigate('/login');
};
