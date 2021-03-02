import { roles } from 'src/config';
import useSWR from 'swr';
// import { useAxios } from 'src/utils/axios';
import fetcher, { fetcherWithoutAuth } from './fetchers';

const useUser = () => {
  const { data, error } = useSWR('/auth/me', fetcher);

  return {
    data: data ? data.data : data,
    loading: !error && !data,
    error
  };
};

export default useUser;

export const useSublocations = (areaName) => {
  const { data, error, mutate } = useSWR(
    `/sublocations?sub_name=${areaName}`,
    fetcher
  );

  return {
    data: data ? data.data.results : data,
    loading: !error && !data,
    error,
    mutate
  };
};

/* eslint-disable */
export const useCounties = (countyName) => {
  const { data, error, mutate } = useSWR(
    `/counties?counties=${countyName}`,
    fetcher,
    { refreshInterval: 0 }
  );

  return {
    data: data ? data.data.results : data,
    loading: !error && !data,
    error,
    mutate
  };
};

export const useCountiesWithoutAuth = () => {
  const { data, error } = useSWR(`/counties`, fetcherWithoutAuth);
  return {
    data: data ? data.data.results : data,
    loading: !error && !data,
    error
  };
};

export const useRegions = (areaName) => {
  const { data, error, mutate } = useSWR(
    `/regions?search=${areaName}`,
    fetcher
  );

  return {
    data: data ? data.data.results : data,
    loading: !error && !data,
    error,
    mutate
  };
};

export const useRegionsWithoutAuth = () => {
  const { data, error } = useSWR(`/regions`, fetcherWithoutAuth);

  return {
    data: data ? data.data.results : data,
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
    data: data ? data.data.results : data,
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

export const useReturn = (id) => {
  const { data, error } = useSWR(`/returns/${id}`, fetcher);

  return {
    data: data ? data.data : data,
    loading: !error && !data,
    error
  };
};

export const useFieldOfficer = (id) => {
  const { data, error } = useSWR(`/field_officers/${id}`, fetcher);

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

export const useUserArea = (userPk) => {
  const { data, error } = useSWR(`users/${userPk}/areas`, fetcher);

  return {
    data: data ? data.data : data,
    loading: !error && !data,
    error
  };
};

export const useUserResource = (pk, endpoint) => {
  const { data, error } = useSWR(`users/${pk}/${endpoint}`, fetcher);

  return {
    data: data ? data.data : data,
    loading: !error && !data,
    error
  };
};

export const useUserInstallations = (pk) => {
  const { data, error } = useSWR(`users/${pk}/installations`, fetcher);

  return {
    data: data ? data.data.results : data,
    loading: !error && !data,
    error
  };
};

export const useUserJurisdiction = (user, area) => {
  let data = {
    type: 'FeatureCollection',
    features: []
  };
  let loading, error;

  const { data: regionResp } = useRegions(area);

  const { data: countiesResp } = useCounties(area);

  const { data: sublocationsResp } = useSublocations(area);

  if (user && user.attributes.role == roles.RM) {
    data = regionsResp;
  }

  if (user && user.attributes.role == roles.CM) {
    data = countiesResp;
  }

  if (user && user.attributes.role == roles.FOO) {
    data = sublocationsResp;
  }

  debugger;

  return {
    data: data ? data.data.results : data,
    loading,
    error
  };
};
