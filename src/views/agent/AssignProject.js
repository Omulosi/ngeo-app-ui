import React from 'react';
// import PropTypes from 'prop-types';
import { useProjects } from 'src/hooks/projects';
import { assignProject } from 'src/redux/actions/projectActions';
import AssignResource from 'src/components/AssignResource';

/* eslint-disable */
const AssignProject = ({ agentDetails }) => {
  const { agentId } = agentDetails;
  const { data, isLoading: loading, error } = useProjects();

  let projectList = [];
  if (data) {
    projectList = data.results.features;
  }

  if (projectList) {
    projectList = projectList.map((project) => {
      return {
        id: project.id,
        name: project.properties.name,
        assignedTo: !!project.properties.agent
      };
    });
  }

  projectList = projectList.filter((project) => !project.assignedTo);

  return (
    <AssignResource
      title="Assign Project"
      fieldLabel="Project"
      resourceList={projectList}
      assigneeId={agentId}
      action={assignProject}
    />
  );
};

export default AssignProject;
