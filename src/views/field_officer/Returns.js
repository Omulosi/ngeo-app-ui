import React, { useState } from 'react';
/* eslint-disable */
import { makeStyles, Box, Tooltip, Avatar } from '@material-ui/core';
import { ArrowRight } from 'react-feather';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import CustomDialog from 'src/components/CustomDialog';
import DataGridDisplay from 'src/components/DataGridDisplay';
import ReturnDetails from './ReturnDetails';

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

const Returns = ({ agentDetails }) => {
  const classes = useStyles();

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const { returns } = agentDetails;

  /* eslint-disable */
  const rows = returns
    ? returns.map((p) => {
        return {
          id: p.id,
          project: p.project,
          dateSubmitted: p.date_submitted,
          rating: p.rating,
          progress: p.progress_report,
          return: p
        };
      })
    : [];

  const columns = [];
  if (rows.length > 0) {
    const fields = Object.keys(rows[0]);
    fields.forEach((field) => {
      let header = '';
      if (field === 'return') {
        return;
      }
      switch (field) {
        case 'id':
          header = 'ID';
          break;
        case 'projet':
          header = 'Project';
          break;
        case 'dateSubmitted':
          header = 'Date Submitted';
          break;
        case 'rating':
          header = 'Rating';
          break;
        case 'progress':
          header = 'Progress Report';
          break;
        default:
          header = field;
      }
      columns.push({ field, headerName: header, flex: 1 });
    });

    const returnInfoField = {
      field: 'return',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box className={classes.actionItem}>
          <Tooltip title="View return" placement="bottom">
            <Avatar className={clsx(classes.dark, classes.viewAction)}>
              <ArrowRight onClick={handleOpenEditDialog} />
              <CustomDialog
                open={editDialogOpen}
                handleClose={handleCloseEditDialog}
              >
                <ReturnDetails returnDetails={params.value} />
              </CustomDialog>
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

Returns.propTypes = {
  agentDetails: PropTypes.object
};

export default Returns;
