import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import BASE_URL from 'src/config';
// const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  });
};

export const axiosWithoutAuth = () => {
  return axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const axiosGeneral = () => {
  return axios.create({
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const useAxios = () => {
  const token = localStorage.getItem('token');

  return makeUseAxios({
    axios: axios.create({
      baseURL: `${BASE_URL}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    })
  });
};
