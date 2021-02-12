import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import customCheckbox from '../theme/customCheckbox';
import CustomPagination from './CustomPagination';

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    color:
      theme.palette.type === 'light'
        ? 'rgba(0,0,0,.85)'
        : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d'
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none'
    },
    '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`
    },
    '& .MuiDataGrid-cell': {
      color:
        theme.palette.type === 'light'
          ? 'rgba(0,0,0,.85)'
          : 'rgba(255,255,255,0.65)'
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0
    },
    ...customCheckbox(theme)
  }
}));

/* eslint-disable */
const ResultGrid = ({ data }) => {
  const classes = useStyles();

  return (
    <div style={{ width: '100%', minHeight: '60vh', color: 'blue' }}>
      <DataGrid
        {...data}
        showToolbar
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20, 25]}
        pagination
        checkboxSelection={true}
        className={classes.root}
        components={{
          Pagination: CustomPagination
        }}
      />
    </div>
  );
};

ResultGrid.propTypes = {
  data: PropTypes.object
};

export default ResultGrid;
