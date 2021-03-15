import axios from 'axios';
/* eslint-disable */
import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL, { HOST, BACKEND_HOST } from 'src/config';
import { SIGNIN, LOGOUT, LOADING_USER, SET_ERRORS } from '../types';

console.log('====================================');
console.log(BACKEND_HOST);
console.log(BASE_URL);

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
      let errorMsg = 'Error signing up';
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

export const login = (
  { email, password },
  navigate,
  enqueueSnackbar,
  setSubmitting
) => (dispatch) => {
  axios
    .post(`http://127.0.0.1:8000/auth/login/`, {
      username: email,
      password
    })
    .then(({ data }) => {
      const token = data.data.token;
      localStorage.setItem('token', `${token}`);
      enqueueSnackbar('Successfuly logged in!', { variant: 'success' });
      setSubmitting(false);
      dispatch({ type: SIGNIN });
      navigate('/app/activity');
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
  console.log(BACKEND_HOST);
  axiosWithAuth()
    .post('http://127.0.0.1:8000/rest-auth/logout/')
    .then((data) => {
      console.log('Logged out');
    })
    .catch((err) => {
      console.log(err);
    });
  dispatch({ type: LOGOUT });
  navigate('/login');
};
