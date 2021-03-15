import React from 'react';
// import PropTypes from 'prop-types';
// import { useProjects } from 'src/hooks/projects';
import { assignProject } from 'src/redux/actions/projectActions';
// import AssignResource from 'src/components/AssignResource';
import RequestApprovalForm from 'src/components/RequestApprovalForm';

/* eslint-disable */
const RequestApproval = () => {
  const statusList = [
    {
      id: 1,
      name: 'Temporary'
    },
    {
      id: 2,
      name: 'Permanent'
    }
  ];

  return (
    <RequestApprovalForm
      title="Approvals Request"
      subTitle="Request approval for temporary or permanent status"
      fieldLabel="Update status"
      resourceList={statusList}
      data={{ agent: [1] }}
      action={assignProject}
    />
  );
};

export default RequestApproval;
