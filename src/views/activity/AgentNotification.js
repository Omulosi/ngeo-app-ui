import React from 'react';
/* eslint-disable */
import { makeStyles } from '@material-ui/core';

import NotificationsDisplay from './NotificationsDisplay';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const AgentNotification = ({ notifications }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate('/app/field_officers/agents/3#approvals');
  };
  return (
    <NotificationsDisplay
      title="Agent Notifications"
      notifications={notifications}
      handleClick={handleClick}
    />
  );
};

export default AgentNotification;
