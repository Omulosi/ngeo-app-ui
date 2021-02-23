// import axios from 'axios';
import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL from 'src/config';
/* eslint-disable */
import { SET_ERRORS } from '../types';

/* eslint-ignore */
export const createAgent = (
  { firstName, lastName, phoneNumber, idNumber, email, terms },
  navigate,
  enqueueSnackbar,
  setSubmitting
) => (dispatch) => {
  axiosWithAuth()
    .post(`${BASE_URL}/agents`, {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      id_number: idNumber,
      email,
      terms
    })
    .then(() => {
      navigate('/app/agents', { replace: true });
      enqueueSnackbar('Agent successfully added!', { variant: 'success' });
      setSubmitting(false);
    })
    .catch((err) => {
      let errorMsg = 'Error adding agent';

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

export const editAgent = (
  { id, firstName, lastName, phoneNumber, idNumber, email, terms },
  navigate,
  enqueueSnackbar,
  setSubmitting
) => (dispatch) => {
  axiosWithAuth()
    .patch(`${BASE_URL}/agents/${id}`, {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      id_number: idNumber,
      email,
      terms
    })
    .then(() => {
      navigate(`/app/agents/${id}`, { replace: true });
      enqueueSnackbar('Agent successfully updated!', { variant: 'success' });
      setSubmitting(false);
    })
    .catch((err) => {
      let errorMsg = 'Error updating agent';

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

export const getAllAgents = () => (dispatch) => {
  // axiosWithAuth()
  //   .get(`${BASE_URL}/agents`, {
  //     first_name: firstName,
  //     last_name: lastName,
  //     phone_number: phoneNumber,
  //     id_number: idNumber,
  //     email,
  //     terms
  //   })
  //   .then(() => {
  //     navigate('/app/agents', { replace: true });
  //     enqueueSnackbar('Agent successfully updated!', { variant: 'success' });
  //     setSubmitting(false);
  //   })
  //   .catch((err) => {
  //     let errorMsg = 'Error updating agent';
  //     // Get the first error message
  //     if (err.response.status !== 404 && err.response && err.response.data) {
  //       for (let k in err.response.data) {
  //         errorMsg = err.response.data[k];
  //         break;
  //       }
  //       errorMsg = errorMsg[0].detail;
  //     }
  //     errorMsg = errorMsg.toLocaleLowerCase();
  //     dispatch({ type: SET_ERRORS, payload: errorMsg });
  //     setSubmitting(false);
  //     console.log(err);
  //   });
};
