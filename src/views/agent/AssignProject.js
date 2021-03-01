import React from 'react';
// import PropTypes from 'prop-types';
import useUser, { useUserProjects } from 'src/data';
import { assignProject } from 'src/redux/actions/projectActions';
import AssignResource from 'src/components/AssignResource';

/* eslint-disable */
const AssignProject = ({ agentDetails }) => {
  const { agentId } = agentDetails;

  const { data: user, loading: userLoading, error: userError } = useUser();

  if (userError) {
    console.log(userError);
  }

  let userPk = null;
  if (user) {
    userPk = user.attributes.pk;
  }
  // get projects for currently logged in field officer/user
  const {
    data: projects,
    loading: projectsLoading,
    error: projectsError
  } = useUserProjects(userPk);

  let projectList = [];
  if (projects) {
    projectList = projects.features;
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
