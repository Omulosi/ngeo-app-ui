import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getProjects = async () => {
  const { data } = await fetchResource('/projects');
  return data;
};

const getProjectById = async (projectId) => {
  const { data } = await fetchResource(`/projects/${projectId}`);
  return data;
};

export function useProjects() {
  return useQuery('projects', getProjects);
}

export function useProject(projectId) {
  return useQuery(['project', projectId], () => getProjectById(projectId));
}
