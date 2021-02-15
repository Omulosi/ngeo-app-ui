import { axiosWithAuth } from '../../utils/axios';
import {
    FETCH_COUNTIES,
    CREATE_COUNTY,
    UPDATE_COUNTY,
    DELETE_COUNTY,
  LOADING_UI,
  SET_ERRORS,
} from '../types';


export const fetchAllCounties = (history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axiosWithAuth()
    .get('/counties')
    .then(({ data }) => {
      dispatch({
        type: FETCH_COUNTIES,
        payload: data
      });
    })
    .catch(err => {
      // redirect to login if unauthorized or token expires

      if (err.response && err.response.status === 401){
        history.push('/login');
      }
      if (err.response && err.response.status === 422){
        history.push('/login');
      }
      let error = err.message;
      dispatch({type: SET_ERRORS, payload: { error }})
    });
};

export const createCounty = countyDetails => dispatch => {
  dispatch({ type: LOADING_UI });
  axiosWithAuth()
    .post('/counties', countyDetails)
    .then(({ data }) => {
      dispatch({
        type: CREATE_COUNTY,
        payload: data
      });
    })
    .catch(err => {
      dispatch(fetchAllCounties());
      let error = err.message
      dispatch({type: SET_ERRORS, payload: { error }})
    });
};


export const deleteCounty = id => dispatch => {
  dispatch({ type: LOADING_UI });
  axiosWithAuth()
    .delete(`/counties/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_COUNTY
      });
    })
    .catch(err => {
      let error = err.message
      dispatch({type: SET_ERRORS, payload: { error }})
    })
};

export const updateCounty = (county, field, values) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axiosWithAuth()
  .patch(`/counties/${county.id}/${field}`, values)
    .then(({data}) => {
      dispatch({type: UPDATE_COUNTY, payload: data})  
    })
    .catch(err => {
      debugger
      let error = err.message
      dispatch({type: SET_ERRORS, payload: { error }})
    })
}