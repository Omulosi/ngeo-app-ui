import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, makeStyles } from '@material-ui/core';
import {
  User as UserIcon,
  MapPin
  //   Users as UsersIcon
} from 'react-feather';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MapIcon from '@material-ui/icons/Map';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';
import NavItem from './Item';
import DrawerComponent from './Drawer';

const useStyles = makeStyles(() => ({
  hide: {
    display: 'none'
  }
}));

const authData = {
  avatar: '/static/images/avatars/avatar_6.png',
  email: 'mulongojohnpaul@gmail.com',
  name: 'John Paul Mulongo',
  role: 'Field Officer',
  isAuthenticated: true
};

// Side menu items with as a map of their links and components
const getMenuItems = (user) => {
  const isAuthorized = user.isAuthenticated;
  const isFieldOfficer = !!user.role && user.role === 'Field Officer';
  // const isRegionalManager = !!user.role && user.role === 'Regional Manager';
  // const isCountyManager = !!user.role && user.role === 'County Manager';
  // const isCEO = !!user.role && user.role === 'CEO';

  const items = [
    {
      href: '/app/map',
      icon: MapIcon,
      title: 'Map',
      visible: true
    },
    {
      href: '/app/dashboard',
      icon: DashboardIcon,
      title: 'Dashboard',
      visible: isAuthorized
    },
    {
      // href: '/app/agents',
      icon: PeopleIcon,
      title: 'Agents',
      visible: isAuthorized && isFieldOfficer,
      items: [
        {
          href: '/app/agents',
          title: 'Agent List',
          visible: isAuthorized
        },
        {
          href: '/app/agent-profile',
          title: 'Agent Profile',
          visible: isAuthorized
        }
      ]
    },
    {
      href: '/app/projects',
      icon: AssignmentIcon,
      title: 'Projects',
      visible: isAuthorized && isFieldOfficer
    },
    {
      icon: MapPin,
      title: 'Incidences',
      visible: isAuthorized,
      items: [
        {
          href: '/app/incidences',
          title: 'Incidence List',
          visible: isAuthorized
        },
        {
          href: '/app/incidences',
          title: 'Incidence Detail',
          visible: isAuthorized
        }
      ]
    },
    {
      href: '/app/account',
      icon: UserIcon,
      title: 'Account',
      visible: isAuthorized
    }
  ];

  return items;
};

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();

  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const items = getMenuItems(authData);

  const content = (
    <div>
      <List>
        {items.map((item) => (
          <NavItem
            href={item.href || '#'}
            key={item.title}
            title={item.title}
            icon={item.icon}
            items={item.items}
            className={item.visible ? null : classes.hide}
          />
        ))}
      </List>
    </div>
  );

  return (
    <>
      <DrawerComponent user={authData}>{content}</DrawerComponent>
    </>
  );

  // return (
  //   <>
  //     <Hidden lgUp>
  //       <Drawer
  //         anchor="left"
  //         classes={{ paper: classes.mobileDrawer }}
  //         onClose={onMobileClose}
  //         open={openMobile}
  //         variant="temporary"
  //       >
  //         {content}
  //       </Drawer>
  //     </Hidden>
  //     <Hidden mdDown>
  //       <Drawer
  //         anchor="left"
  //         classes={{ paper: classes.desktopDrawer }}
  //         open
  //         variant="persistent"
  //       >
  //         {content}
  //       </Drawer>
  //     </Hidden>
  //   </>
  // );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
