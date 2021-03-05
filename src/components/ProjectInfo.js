import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { projectThemes } from 'src/config';
import DetailsDisplay from 'src/components/DetailsDisplay';
// import SuccesChip from 'src/components/SuccessChip';
import PendingChip from 'src/components/PendingChip';
// import FailureChip from 'src/components/FailureChip';

/* eslint-disable */
const ProjectInfo = ({ projectDetails }) => {
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
      value: <PendingChip label="In Progress" />
    },
    {
      name: 'Date assigned',
      value: moment(new Date()).format('ll')
    },
    {
      name: 'Return',
      value: 'Submitted'
    }
  ];

  return <DetailsDisplay data={rows} title="Project Info" />;
};

ProjectInfo.propTypes = {
  projectDetails: PropTypes.object
};

export default ProjectInfo;
