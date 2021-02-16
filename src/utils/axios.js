import axios from "axios";
// import { BASE_URL } from "http://127.0.0.1/api/v1";
const BASE_URL = "http://127.0.0.1/api/v1";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};

export const axiosWithoutAuth = () => {
  
  return axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
