import React from 'react';
import PropTypes from 'prop-types';
import { projectThemes } from 'src/config';
import DetailsDisplay from './DetailsDisplay';

const ProjectDetails = ({ projectDetails }) => {
  const { name, description, theme } = projectDetails;

  const rows = [
    {
      name: 'Name',
      value: name || ''
    },
    {
      name: 'Description',
      value: description || ''
    },
    {
      name: 'Theme',
      value: projectThemes[theme] || ''
    },
    {
      name: 'Status',
      value: 'In Progress'
    },
    {
      name: 'Date assigned',
      value: '23/02/2020'
    },
    {
      name: 'report',
      value: 'submitted'
    }
  ];

  return <DetailsDisplay data={rows} title="Project Info" />;
};

ProjectDetails.propTypes = {
  projectDetails: PropTypes.object
};

export default ProjectDetails;
