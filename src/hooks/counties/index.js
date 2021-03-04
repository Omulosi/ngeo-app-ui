import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getCounties = async () => {
  const { data } = await fetchResource('/counties');
  return data;
};

const getCounty = async (countyName) => {
  const { data } = await fetchResource(`/counties?counties=${countyName}`);
  return data;
};

export function useCounties() {
  return useQuery('counties', getCounties);
}

export function useCounty(countyName) {
  return useQuery(['counties', countyName], () => {
    return getCounty(countyName);
  });
}
