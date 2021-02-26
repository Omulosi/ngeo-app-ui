import React from 'react';
import PropTypes from 'prop-types';
import useUser, { useUserProjects } from 'src/data';
/* eslint-disable */
import { assignProjectToAgent } from 'src/redux/actions/projectActions';
// import AssignResource from 'src/components/AssignResource';
import AddArea from 'src/components/AddArea';

const AssignArea = ({ fieldOfficerDetails = {} }) => {
  const { fieldOfficerId } = fieldOfficerDetails;
  const { data: user, error: userError } = useUser();

  if (userError) {
    console.log(userError);
  }

  let userPk = null;
  if (user) {
    userPk = user.attributes.pk;
  }

  // get projects for currently logged in field user
  const { data: projects, error: projectsError } = useUserProjects(userPk);

  if (projectsError) {
    console.log(projectsError);
  }

  let projectList = [];
  if (projects) {
    projectList = projects.features;
  }

  if (projectList) {
    projectList = projectList.map((project) => {
      return {
        id: project.id,
        name: project.properties.name,
        assignedTo: !!project.properties.field_officer
      };
    });
  }

  projectList = projectList.filter((project) => !project.assignedTo);

  return <AddArea />;
};

AssignArea.propTypes = {
  fieldOfficerDetails: PropTypes.object
};

export default AssignArea;
