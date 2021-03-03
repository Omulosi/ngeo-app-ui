import React from 'react';
import { useAgents } from 'src/hooks/agents';
import { useProjects } from 'src/hooks/projects';
import ReturnForm from './ReturnForm';

/* eslint-disable */
const AddReturn = () => {
  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError
  } = useProjects();

  const {
    data: agents,
    isLoading: agentsLoading,
    error: agentsError
  } = useAgents();

  let projectList = [];

  if (projects) {
    projectList = projects.results.features.map((ft) => {
      return {
        name: ft.properties.name,
        id: ft.id
      };
    });
  }

  let agentList = [];

  if (agents) {
    agentList = agents.map((agent) => {
      return {
        name: `${agent.attributes.first_name} ${agent.attributes.last_name}`,
        id: agent.id
      };
    });
  }

  return <ReturnForm projectList={projectList} agentList={agentList} />;
};

export default AddReturn;
