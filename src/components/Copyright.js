import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

/* eslint-disable */
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{padding: '2em'}}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Ngeo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
