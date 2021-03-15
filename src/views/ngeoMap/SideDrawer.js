import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { IconButton } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  menu: {
    position: 'fixed',
    top: '.1em',
    right: '.2em',
    zIndex: 1110
  }
});

/* eslint-disable */
export default function SideDrawer({ children }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });

  /* eslint-disable */
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <>
        <IconButton
          className={classes.menu}
          color="primary"
          onClick={toggleDrawer('right', true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer('right', false)}
        >
          <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            {children}
          </div>
        </Drawer>
      </>
    </div>
  );
}
