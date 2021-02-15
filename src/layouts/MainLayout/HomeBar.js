import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(({
  header: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 3,
    transition: 'all 250ms ease-out',
    height: '60px',
    backgroundColor: 'rgba(32,33,36,0.5)'
  },

  headerContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.3)'
  },
  headerLogo: {
    position: 'absolute',
    top: '16px',
    left: '76px',
    zIndex: 1
  },
  nav: {
    width: '100%',
    justifContnt: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    position: 'absolute',
    top: '16px',
    left: '60px',
    zIndex: 2
  }

}));

const HomeBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.headerContainer}>
        <div className={classes.logo}>Ngeo</div>
        <nav className={classes.nav}>
          <ul>Menu</ul>
        </nav>
      </div>
    </div>
  );
};

export default HomeBar;
