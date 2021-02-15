import axios from "axios";
import {
  SIGNIN,
  SIGNUP,
  LOGOUT,
  RESET_PASSWORD,
  FETCH_USER_PROFILE,
  UPDATE_USER_PROFILE,
  SUCCESS,
  LOADING_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
} from "../types";

import { axiosWithAuth } from "../../utils/axios";

import { BASE_URL } from "../../config/urls";

export const signUp = (
  { first_name, last_name, email, password, role },
  history
) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post(`${BASE_URL}/auth/signup`, {
      first_name,
      last_name,
      email,
      password,
      role,
    })
    .then(({ data }) => {
      // const token = data.user.token;
      // const user = data.user;
      // localStorage.setItem("token", `${token}`);
      // dispatch({ type: SIGNIN, payload: user });
      history.push("/signin");
    })
    .catch((err) => {
      let errorMsg = "Unable to Sign Up";
      // Get the first error message
      if (err.response && err.response.data) {
        for (let k in err.response.data) {
          errorMsg = err.response.data[k];
          break;
        }
        errorMsg = errorMsg[0].detail;
      }
      dispatch({type: SET_ERRORS, payload: errorMsg})
      console.log(err);
    });
};

export const login = ({ email, password }, history) => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .post(`${BASE_URL}/auth/login`, {
      email,
      password,
    })
    .then(({ data }) => {
      const token = data.user.token;
      const user = data.user;
      localStorage.setItem("token", `${token}`);
      dispatch({ type: SIGNIN, payload: user });
      history.push("/map");
    })
    .catch((err) => {
      let errorMsg = "Error signin in";
      // Get the first error message
      if (err.response && err.response.data) {
        for (let k in err.response.data) {
          errorMsg = err.response.data[k];
          break;
        }
      }
      dispatch({type: SET_ERRORS, payload: errorMsg})
      console.log(err);
    });
};

export const logout = (history) => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.setItem("reduxState", null);
  dispatch({ type: LOGOUT });
  history.push("/");
  window.location.reload(true);
};
