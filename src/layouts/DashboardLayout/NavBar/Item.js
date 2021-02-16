import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Tooltip
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

const NavItem = ({
  href, icon: Icon, title, className
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Tooltip title={`${title}`} placement="right">
      <ListItem onClick={() => navigate(href)} className={clsx(classes.item, className)}>
        <ListItemIcon>{Icon && <Icon />}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </Tooltip>
  );
};

NavItem.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
};

export default NavItem;
