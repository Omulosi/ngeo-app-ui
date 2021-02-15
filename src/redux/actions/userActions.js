import axios from "axios";
import {
  SIGNIN,
  SIGNUP,
  LOGOUT,
  RESET_PASSWORD,
  FETCH_USER_PROFILE,
  UPDATE_USER_PROFILE,
  SUCCESS,
  LOADING,
  SET_ERRORS,
  CLEAR_ERRORS
} from "../types";

import { axiosWithAuth } from "../../utils/axios";

import { BASE_URL } from "../../config/index";

export const userLogin = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING });
  axios
    .post(`${BASE_URL}/auth/login`, {
      email: userData.email,
      password: userData.password,
    })
    .then(({ data }) => {
      // get user details too: data.userId
      const token = data.token;
      localStorage.setItem("token", `${token}`);
      history.push("/c/dashboard");
    })
    .catch((err) => {
      let errorMsg;
      if (err.response) {
        if (err.response.data.non_field_errors) {
          errorMsg = err.response.data.non_field_errors[0]
        }
      }
      else {
        errorMsg = err.message;
      }
      errorMsg = errorMsg || "Error logging in";
      dispatch({
        type: SET_ERRORS,
        payload: { errorMsg },
      });
     
    });
};

export const userSignUp = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING });
  axios
    .post(`${BASE_URL}/auth/signup`, {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password
    })
    .then(({ data }) => {
      const token = data.token;
      localStorage.setItem("token", `${token}`);
      history.push("/c/dashboard");
    })
    .catch((err) => {
      let errorMsg= "";
      if (err.response) {
        if (err.response.data) {
          try {
            errorMsg = err.response.data.email.pop() || err.response.data.firstName.pop() || err.response.data.lastName.pop() || err.response.data.password.pop() || err.response.data.non_field_errors[0];
          } catch (err) {
            errorMsg = "Something went wrong, unable to sign up."
          }
         
        }
      }
      else{
        errorMsg = err.message;
      }
      errorMsg = errorMsg || "Error signing up";
      dispatch({
        type: SET_ERRORS,
        payload: { errorMsg },
      });
    
    });
};

export const updateUser = (user, field, newData) => (dispatch) => {
  dispatch({ type: EDITTING_USER });
  axiosWithAuth()
    .patch(`/users/${user.id}/${field}`, newData)
    .then(({ data }) => {
      const user = data.data[0];
      dispatch({
        type: UPDATE_USER_DETAILS,
        payload: user,
      });
      localStorage.setItem("profile", JSON.stringify(user));
    })
    .catch((err) => {
      let error = err.response ? err.response.data.error : err.message;
      dispatch({
        type: SET_ERRORS,
        payload: { error },
      });
    });
};

export const logout = (history) => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.setItem("reduxState", null);
  dispatch({ type: LOGOUT });
  history.push("/");
  window.location.reload(true);
};
