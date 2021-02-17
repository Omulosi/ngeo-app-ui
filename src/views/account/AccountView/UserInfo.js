import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { roleNames } from 'src/config';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

/* eslint-disable */
const Profile = ({ className, profileDetails }) => {
  const classes = useStyles();

  let fullName = '';
  let role = '';
  let jurisdiction = '';
  if (profileDetails && Object.entries(profileDetails) !== 0) {
    fullName = `${profileDetails.first_name} ${profileDetails.last_name}`;
    role = roleNames[profileDetails.role];
    jurisdiction = profileDetails.jurisdiction;
  }

  const user = {
    avatar: '',
    name: fullName || '',
    timezone: 'GTM+3',
    role: role || '',
    jurisdiction: jurisdiction || ''
  };

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={user.avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user.name}
          </Typography>

          <Typography color="textSecondary" variant="body1">
            {`${user.role}`}
          </Typography>

          <Typography color="textSecondary" variant="body1">
            {`${user.jurisdiction}`}
          </Typography>

          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  profileDetails: PropTypes.object
};

export default Profile;
