import React from 'react';
/* eslint-disable */
import { makeStyles, Box, Tooltip, Avatar } from '@material-ui/core';
import { ArrowRight } from 'react-feather';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import DataGridDisplay from 'src/components/DataGridDisplay';
import { useNavigate } from 'react-router';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {},
  gridWrapper: {
    height: '75vh',
    width: 'auto'
  },
  grid: {
    marginTop: theme.spacing(5)
  },
  progress: {
    marginTop: '0.3em'
  },
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

const ReturnList = ({ returns = [] }) => {
  const classes = useStyles();

  const navigate = useNavigate();

  /* eslint-disable */
  const rows = returns
    ? returns.map((p) => {
        return {
          ...p.attributes,
          id: p.id,
          date_submitted: moment(p.attributes.date_submitted).format('lll'),
          return: p.id
        };
      })
    : [];

  const columns = [];
  if (rows.length > 0) {
    const fields = Object.keys(rows[0]);
    fields.forEach((field) => {
      let header = '';
      if (field === 'return' || field == 'project' || field == 'agent') {
        return;
      }
      switch (field) {
        case 'id':
          header = 'ID';
          break;
        case 'project':
          header = 'Project';
          break;
        case 'date_submitted':
          header = 'Date Submitted';
          break;
        case 'rating':
          header = '% Rating';
          break;
        case 'remarks':
          header = 'Remarks';
          break;
        case 'date_submitted':
          header = 'Date Submitted';
          break;
        default:
          header = field;
      }
      columns.push({
        field,
        headerName: header,
        flex: 1,
        hide: field === 'id'
      });
    });

    const returnInfoField = {
      field: 'return',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box className={classes.actionItem}>
          <Tooltip title="View return" placement="bottom">
            <Avatar className={clsx(classes.dark, classes.viewAction)}>
              <ArrowRight
                onClick={() => navigate(`/app/returns/${params.row.id}`)}
              />
            </Avatar>
          </Tooltip>
        </Box>
      )
    };

    columns.push(returnInfoField);
  }

  const returnData = { columns, rows };

  return <DataGridDisplay data={returnData} />;
};

ReturnList.propTypes = {
  returns: PropTypes.array
};

export default ReturnList;
