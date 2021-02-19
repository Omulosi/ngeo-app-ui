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
const AgentInfo = () => {
  const classes = useStyles();

  const rows = [
    {
      name: 'Email',
      value: 'adam.denisov@devias.io'
    },
    {
      name: 'First Name',
      value: 'David'
    },
    {
      name: 'Last Name',
      value: 'Hume'
    },
    {
      name: 'Employment terms',
      value: 'Casual'
    },
    { name: 'Phone', value: '+254 748 327 439' },
    { name: 'Country', value: 'Kenya' },
    { name: 'County', value: 'Isiolo' }
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

export default AgentInfo;
