import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  item: {
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'rgba(0,0,0,0.04)'
    }
  },
}));

const NavItem = ({ href, icon: Icon, title }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <ListItem onClick={() => navigate(href)} className={classes.item}>
      <ListItemIcon>{Icon && <Icon />}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

NavItem.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string,
  href: PropTypes.string
};

export default NavItem;
