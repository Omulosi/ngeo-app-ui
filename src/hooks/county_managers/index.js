import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getCountyManager = async () => {
  const { data } = await fetchResource('/county_managers/me');
  return data;
};

export default function useCountyManager() {
  return useQuery('countyManager', () => getCountyManager());
}
