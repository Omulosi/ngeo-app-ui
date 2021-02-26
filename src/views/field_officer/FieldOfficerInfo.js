import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DetailsDisplay from 'src/components/DetailsDisplay';

/*eslint-disable */
const FieldOfficerInfo = ({ details }) => {
  const {
    email,
    first_name: firstName,
    is_active: status,
    last_name: lastName,
    date_joined: dateJoined
  } = details;

  const rows = [
    {
      name: 'Email',
      value: email || ''
    },
    {
      name: 'First Name',
      value: firstName || ''
    },
    {
      name: 'Last Name',
      value: lastName || ''
    },
    { name: 'Status', value: (status && 'Active') || 'Inactive' },
    { name: 'Date Joined', value: moment(dateJoined).format('lll') }
  ];

  return <DetailsDisplay title="Field Officer Info" data={rows} />;
};

FieldOfficerInfo.propTypes = {
  etails: PropTypes.object
};

export default FieldOfficerInfo;
