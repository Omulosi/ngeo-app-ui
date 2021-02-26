import React from 'react';
/* eslint-disable */
import { Container, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Scrollbars } from 'react-custom-scrollbars';

const useStyles = makeStyles((theme) => ({
  root: {},
  gridWrapper: {
    height: '75vh',
    width: 'auto'
  },
  grid: {},
  dark: {
    color: '#263238',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#263238'
    }
  },
  actionItem: {
    display: 'flex',
    justifyContent: 'space-betweeb',
    alignItems: 'center'
  },
  viewAction: {
    marginLeft: '0.7rem'
  }
}));

const DataGridDisplay = ({ data, title }) => {
  const classes = useStyles();
  return (
    <div className={classes.gridWrapper}>
      <Scrollbars>
        <DataGrid
          {...data}
          components={{
            Toolbar: GridToolbar
          }}
          showToolbar
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
          className={classes.grid}
        />
      </Scrollbars>
    </div>
  );
};

DataGridDisplay.propTypes = {
  /*
    data object must have the fields 'row and 'column'
     */
  data: PropTypes.object
};

export default DataGridDisplay;
