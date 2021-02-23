import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

/* eslint-disable */
const Toolbar = ({ className, title, navLink, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-start">
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate(`${navLink}`)}
        >
          {title}
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
