// import axios from 'axios';
import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL from 'src/config';
/* eslint-disable */
import { SET_ERRORS } from '../types';

/* eslint-ignore */
export const assignProject = (
  { resourceId, data },
  navigate,
  enqueueSnackbar,
  setSubmitting
) => (dispatch) => {
  axiosWithAuth()
    .patch(`${BASE_URL}/projects/${resourceId}`, data)
    .then(() => {
      enqueueSnackbar('Project assigned to agent successfully!', {
        variant: 'success'
      });
      setSubmitting(false);
    })
    .catch((err) => {
      let errorMsg = 'Error assigning project to agent';
      debugger;

      // Get the first error message
      if (err.response.status !== 404 && err.response && err.response.data) {
        for (let k in err.response.data) {
          errorMsg = err.response.data[k];
          break;
        }
        errorMsg = errorMsg[0].detail;
      }

      errorMsg = errorMsg.toLocaleLowerCase();

      enqueueSnackbar('Error assigning project', {
        variant: 'error'
      });

      dispatch({ type: SET_ERRORS, payload: errorMsg });
      setSubmitting(false);
      console.log(err);
    });
};
