import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from 'src/config';
import {
  SIGNIN,
  LOGOUT,
  LOADING_USER,
  SET_ERRORS
} from '../types';

// import { axiosWithAuth } from '../../utils/axios';

/* eslint-ignore */
// export const signUp = (
//   /* eslint-ignore */
//   {
//     first_name, last_name, email, password, role
//   },
//   history
// ) => (dispatch) => {
//   dispatch({ type: LOADING_USER });
//   axios
//     .post(`${BASE_URL}/auth/signup`, {
//       first_name,
//       last_name,
//       email,
//       password,
//       role
//     })
//     .then(({ data }) => {
//       // const token = data.user.token;
//       // const user = data.user;
//       // localStorage.setItem("token", `${token}`);
//       // dispatch({ type: SIGNIN, payload: user });
//       history.push('/signin');
//     })
//     .catch((err) => {
//       let errorMsg = 'Unable to Sign Up';
//       // Get the first error message
//       if (err.response && err.response.data) {
//         for (let k in err.response.data) {
//           errorMsg = err.response.data[k];
//           break;
//         }
//         errorMsg = errorMsg[0].detail;
//       }
//       dispatch({ type: SET_ERRORS, payload: errorMsg });
//       console.log(err);
//     });
// };

export const login = ({ email, password }) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  const navigate = useNavigate();

  axios
    .post(`${BASE_URL}/auth/login`, {
      email,
      password
    })
    .then(({ data }) => {
      const { user } = data;
      const { token } = user;
      const authData = {
        avatar: '/static/images/avatars/avatar_6.png',
        email: 'karl@example.com',
        name: 'karl marx',
        role: 'Field Outreach Officer',
      };
      localStorage.setItem('token', `${token}`);
      dispatch({ type: SIGNIN, payload: authData });
      navigate('/app/map', { replace: true });
    })
    .catch((err) => {
      let errorMsg = 'Error signin in';
      // Get the first error message
      /* eslint-ignore */
      if (err.response && err.response.data) {
        for (let k in err.response.data) {
          errorMsg = err.response.data[k];
          break;
        }
      }
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      console.log(err);
    });
};

export const logout = () => (dispatch) => {
  const navigate = useNavigate();
  localStorage.removeItem('token');
  localStorage.setItem('reduxState', null);
  dispatch({ type: LOGOUT });
  navigate('/');
};
