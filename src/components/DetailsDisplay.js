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
const DetailsDisplay = ({ data, title }) => {
  const classes = useStyles();

  return (
    <Paper elevation={1}>
      <div>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
      </div>
      <Divider />
      <TableContainer>
        <Table className={classes.table}>
          <TableBody>
            {data.map((row) => (
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

DetailsDisplay.propTypes = {
  data: PropTypes.array
};

export default DetailsDisplay;
