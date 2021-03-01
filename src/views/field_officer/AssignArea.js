import React from 'react';
import PropTypes from 'prop-types';
import useUser from 'src/data';
/* eslint-disable */
// import AssignResource from 'src/components/AssignResource';
import AddArea from 'src/components/AddArea';

const AssignArea = ({ fieldOfficerDetails = {} }) => {
  const { foId } = fieldOfficerDetails;
  const { data: user, error: userError } = useUser();

  if (userError) {
    console.log(userError);
  }

  let userPk = null;
  if (user) {
    userPk = user.attributes.pk;
  }

  return <AddArea user={{ field_officer: foId }} />;
};

AssignArea.propTypes = {
  fieldOfficerDetails: PropTypes.object
};

export default AssignArea;
