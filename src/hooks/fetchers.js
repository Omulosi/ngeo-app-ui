import { axiosGeneral, axiosWithAuth, axiosWithoutAuth } from 'src/utils/axios';

export default async (url) => {
  const { data } = await axiosWithAuth().get(url);
  return data;
};

export const fetcherWithoutAuth = async (url) => {
  const { data } = await axiosWithoutAuth().get(url);
  return data;
};

export const generalFetcher = async (url) => {
  const { data } = await axiosGeneral().get(url);
  return data;
};
