import React from 'react';
import PropTypes from 'prop-types';
import DetailsDisplay from './DetailsDisplay';

const ReturnDetails = ({ returnDetails }) => {
  const {
    project,
    date_submitted: dateSubmitted,
    rating,
    progress_report: progressReport
  } = returnDetails;

  const rows = [
    {
      name: 'Project',
      value: project || ''
    },
    {
      name: 'Date Submitted',
      value: dateSubmitted || ''
    },
    {
      name: 'Rating',
      value: rating || ''
    },
    {
      name: 'Progreess Reprot',
      value: progressReport
    }
  ];

  return <DetailsDisplay data={rows} title="Return Details" />;
};

ReturnDetails.propTypes = {
  returnDetails: PropTypes.object
};

export default ReturnDetails;
