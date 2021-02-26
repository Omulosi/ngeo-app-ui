import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, makeStyles } from '@material-ui/core';
// import { useSnackbar } from 'notistack';
import useUser from 'src/data';
import LineProgress from 'src/components/LineProgress';
import NavItem from './Item';
import DrawerComponent from './Drawer';
import getMenuItems from './menuItems';

const useStyles = makeStyles(() => ({
  hide: {
    display: 'none'
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { data, loading, error } = useUser();

  if (error) {
    console.log(error);
  }

  let profileData = null;
  if (data) {
    profileData = data.attributes;
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const items = getMenuItems(profileData);

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
      {loading && <LineProgress />}
      <DrawerComponent profileData={profileData}>{content}</DrawerComponent>
    </>
  );
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
