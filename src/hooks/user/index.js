import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getUser = async () => {
  const { data } = await fetchResource('/auth/me');
  if (data) {
    data.isAuthenticated = true;
  }
  return data;
};

export default function useUser() {
  return useQuery('user', () => getUser());
}
