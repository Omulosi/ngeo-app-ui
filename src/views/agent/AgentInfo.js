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
import { terms as termsDict } from 'src/config';

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
const AgentInfo = ({ agentDetails }) => {
  const {
    email,
    first_name: firstName,
    id_number: idNumber,
    last_name: lastName,
    phone_number: phoneNumber,
    terms
  } = agentDetails;

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
    {
      name: 'Employment terms',
      value: termsDict[terms]
    },
    { name: 'Phone', value: phoneNumber || '' },
    { name: 'ID Number', value: idNumber || '' },
    { name: 'County', value: '' }
  ];

  return (
    <Paper elevation={1}>
      <div>
        <Typography variant="h5" className={classes.title}>
          Agent Info
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

AgentInfo.propTypes = {
  agentDetails: PropTypes.object
};

export default AgentInfo;
