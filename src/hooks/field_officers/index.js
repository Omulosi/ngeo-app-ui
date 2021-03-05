import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getFieldOfficer = async () => {
  const { data } = await fetchResource('/field_officers/me');
  return data;
};

const getFieldOfficerById = async (id) => {
  const { data } = await fetchResource(`/field_officers/${id}`);
  return data;
};

export default function useFieldOfficer() {
  return useQuery('fieldOfficer', () => getFieldOfficer());
}

export function useFieldOfficerById(fooId) {
  return useQuery(['fieldOfficer', fooId], () => getFieldOfficerById(fooId));
}
