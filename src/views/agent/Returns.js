import React, { useState } from 'react';
/* eslint-disable */
import { Container, makeStyles, Box, Tooltip, Avatar } from '@material-ui/core';
import { ArrowRight } from 'react-feather';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
// import { useNavigate } from 'react-router-dom';
// import DataGrid from 'src/components/DataGrid';
// import { useSnackbar } from 'notistack';
// import { useAxios } from 'src/utils/axios';
import { projectThemes } from 'src/config';
import CustomDialog from 'src/components/CustomDialog';
// import ProjectDetails from './ProjectDetails';
import ReturnDetails from './ReturnDetails';
// import { Scrollbars } from 'react-custom-scrollbars';

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
  // const [projects, setProjects] = useState([]);
  // const { enqueueSnackbar } = useSnackbar();

  // const [{ data, loading, error }] = useAxios()('/isiolo_projects');

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   console.log(`Error => ${error}`);
  //   enqueueSnackbar('Unable to fetch profile data', {
  //     variant: 'info'
  //   });
  // }

  // let projects = [];
  // if (data) {
  //   projects = data.data.results ? data.data.results.features : [];
  // }

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

  return (
    <Page title="Projects" className={classes.root}>
      <Container maxWidth={false}>
        <div className={classes.gridWrapper}>
          <DataGrid
            {...returnData}
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
        </div>
      </Container>
    </Page>
  );
};

Returns.propTypes = {
  agentDetails: PropTypes.object
};

export default Returns;
