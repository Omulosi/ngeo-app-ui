// import axios from 'axios';
import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL from 'src/config';
/* eslint-disable */
import { SET_ERRORS } from '../types';

/* eslint-ignore */
export const assignArea = (data, navigate, enqueueSnackbar, setSubmitting) => (
  dispatch
) => {
  debugger;
  axiosWithAuth()
    .post(`${BASE_URL}/areas`, data)
    .then(() => {
      enqueueSnackbar('Area assigned to user successfully!', {
        variant: 'success'
      });
      setSubmitting(false);
      //   navigate(`/app/agents/${agentId}`, { replace: true });
    })
    .catch((err) => {
      let errorMsg = 'Error assigning area to user';

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
