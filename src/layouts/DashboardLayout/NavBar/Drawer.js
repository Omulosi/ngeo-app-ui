import React from 'react';
import clsx from 'clsx';
/* eslint-disable */
import {
  Typography,
  makeStyles,
  Avatar,
  Tooltip,
  ListItem,
  ListItemIcon
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'src/redux/actions/authActions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '65px',
    padding: '0 24px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  profile: {
    padding: '12px 24px',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column'
  },
  gutter: {
    paddingTop: '16px',
    paddingBottom: '8px'
  },
  logo: {
    fontWeight: 'bold',
    letterSpacing: '1px',
    fontSize: '1.2rem'
  },
  authBtn: {
    fontSize: '0.9em',
    cursor: 'pointer',
    fontWeight: 600
  },
  menuButton: {
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    cursor: 'pointer',
    paddingBottom: '8px',
    paddingTop: '16px',
    marginBottom: 0,
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'rgba(0,0,0,0.04)'
    }
  }
}));

export default function DrawerComponent({ user, children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const userBox = user.isAuthenticated ? (
    <div className={clsx(classes.profile)}>
      <Avatar>{user.name.charAt(0)}</Avatar>
      <Typography
        color="textSecondary"
        variant="body2"
        className={classes.gutter}
      >
        {user.name}
      </Typography>
      <Typography
        color="textSecondary"
        variant="body2"
        style={{ paddingBottom: '4px' }}
      >
        {user.email}
      </Typography>
      <Typography color="textSecondary" variant="body2">
        {user.role}
      </Typography>
      <Typography
        style={{ color: '#1a73e8', paddingTop: '0.3em' }}
        variant="body2"
        className={classes.authBtn}
      >
        <span onClick={() => dispatch(logout())}>Sign out</span>
      </Typography>
    </div>
  ) : (
    <div className={classes.profile}>
      <Typography
        style={{ color: '#1a73e8', paddingTop: '0.3em' }}
        variant="body2"
        className={classes.authBtn}
      >
        <span onClick={() => navigate('/login')}>Sign in</span>
      </Typography>
    </div>
  );

  const menuButton = (
    <Tooltip title="menu" placement="right">
      <ListItem className={classes.menuButton}>
        <ListItemIcon
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </ListItemIcon>
      </ListItem>
    </Tooltip>
  );

  const menuToolbar = (
    <div className={classes.toolbarIcon}>
      <div className={classes.logo}>Ngeo</div>
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        {open ? null : menuButton}
        {open ? menuToolbar : null}
        {open ? userBox : null}
        {open ? <Divider /> : null}
        {children}
      </Drawer>
    </div>
  );
}

DrawerComponent.propTypes = {
  children: PropTypes.any,
  user: PropTypes.object
};
