import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getAgents = async () => {
  const { data } = await fetchResource('/agents');
  return data;
};

const getAgentById = async (agentId) => {
  const { data } = await fetchResource(`/agents/${agentId}`);
  return data;
};

export function useAgents() {
  return useQuery('agents', getAgents);
}

export function useAgent(agentId) {
  return useQuery(['agent', agentId], () => getAgentById(agentId));
}
