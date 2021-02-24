import useSWR from 'swr';
import fetcher from './fetchers';

const useUser = () => {
  const { data, error } = useSWR('/auth/me', fetcher);

  return {
    data: data ? data.data : data,
    loading: !error && !data,
    error
  };
};

export default useUser;

export const useJurisdiction = (subLocationName) => {
  const { data, error } = useSWR(
    `/sublocations?locname=${subLocationName}`,
    fetcher
  );

  return {
    area: data ? data.data.results : data,
    loading: !error && !data,
    error
  };
};

export const useCounties = () => {
  const { data, error } = useSWR('/counties', fetcher);

  return {
    counties: data ? data.data.results : data,
    loading: !error && !data,
    error
  };
};

export const useIsioloInstallations = () => {
  const { data, error } = useSWR('/isiolo_key_installations', fetcher);

  return {
    installations: data ? data.data.results : data,
    loading: !error && !data,
    error
  };
};

export const useIsioloProjects = () => {
  const { data, error } = useSWR('/isiolo_projects', fetcher);

  return {
    projects: data ? data.data : data,
    loading: !error && !data,
    error
  };
};

export const useIncidents = () => {
  const { data, error } = useSWR('/incidents', fetcher);

  return {
    data: data ? data.data.results : data,
    loading: !error && !data,
    error
  };
};

export const useAgents = () => {
  const { data, error } = useSWR('/agents', fetcher);

  return {
    data: data ? data.data : data,
    loading: !error && !data,
    error
  };
};

export const useAgent = (id) => {
  const { data, error } = useSWR(`/agents/${id}`, fetcher);

  return {
    data: data ? data.data : data,
    loading: !error && !data,
    error
  };
};

export const useProjects = () => {
  const { data, error } = useSWR('/projects', fetcher);

  return {
    data: data ? data.data.results : data,
    loading: !error && !data,
    error
  };
};

export const useUserProjects = (userPk) => {
  const { data, error } = useSWR(`users/${userPk}/projects`, fetcher);

  return {
    data: data ? data.data : data,
    loading: !error && !data,
    error
  };
};

export const useUserAgents = (userPk) => {
  const { data, error } = useSWR(`users/${userPk}/agents`, fetcher);

  return {
    data: data ? data.data : data,
    loading: !error && !data,
    error
  };
};
