import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
/* eslint-disable */
import { Box, Divider, makeStyles } from '@material-ui/core';
import Button from './Button';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {},
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  btn: {
    textTransform: 'none'
  }
}));

const Toolbar = ({ className, title, navLink, btnIcon, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="primary"
          variant="contained"
          className={classes.btn}
          onClick={() => navigate(`${navLink}`)}
        >
          {btnIcon}
          {title}
        </Button>
      </Box>
      <Divider className={classes.divider} />
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
