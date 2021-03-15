import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
// import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  //   TableHead,
  TableRow,
  //   TableSortLabel,
  //   Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  },
  row: {
    cursor: 'pointer',
    width: '100%'
  }
}));

/* eslint-disable */

const NotificationsDisplay = ({
  title,
  notifications,
  handleClick,
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title={title} />
      <Divider />
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow
                  hover
                  className={classes.row}
                  key={notification.id}
                  onClick={handleClick}
                >
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>
                    {moment(notification.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

// NotificationsDisplay.propTypes = {
//   className: PropTypes.string,
//   title: PropTypes.string
// };

export default NotificationsDisplay;
