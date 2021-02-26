import React from 'react';
import {
  Divider,
  Paper,
  TableContainer,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableRow,
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';

const useStyles = makeStyles({
  table: {},
  title: {
    padding: '1em'
  },
  rowHeader: {
    fontWeight: 500
  },
  rowBody: {
    fontWeight: 400
  }
});

/*eslint-disable */
const FieldOfficerInfo = ({ details }) => {
  const {
    email,
    first_name: firstName,
    is_active: status,
    last_name: lastName,
    date_joined: dateJoined
  } = details;

  const classes = useStyles();

  const rows = [
    {
      name: 'Email',
      value: email || ''
    },
    {
      name: 'First Name',
      value: firstName || ''
    },
    {
      name: 'Last Name',
      value: lastName || ''
    },
    { name: 'Status', value: (status && 'Active') || 'Inactive' },
    { name: 'Date Joined', value: moment(dateJoined).format('lll') }
  ];

  return (
    <Paper elevation={1}>
      <div>
        <Typography variant="h5" className={classes.title}>
          Field Officer Info
        </Typography>
      </div>
      <Divider />
      <TableContainer>
        <Table className={classes.table}>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.rowHeader}
                >
                  {row.name}
                </TableCell>
                <TableCell align="left" className={classes.rowBody}>
                  {row.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

FieldOfficerInfo.propTypes = {
  etails: PropTypes.object
};

export default FieldOfficerInfo;
