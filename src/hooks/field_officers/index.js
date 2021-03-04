import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getFieldOfficer = async () => {
  const { data } = await fetchResource('/field_officers/me');
  return data;
};

export default function useFieldOfficer() {
  return useQuery('fieldOfficer', () => getFieldOfficer());
}
