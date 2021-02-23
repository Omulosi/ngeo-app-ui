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
import ProjectDetails from './ProjectDetails';
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

const AgentProjects = ({ agentDetails }) => {
  const classes = useStyles();

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const { projects } = agentDetails;
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
  const rows = projects
    ? projects.map((p) => {
        return {
          id: p.id,
          name: p.name,
          description: p.description,
          theme: projectThemes[p.theme],
          // will be passed to modal
          project: p
        };
      })
    : [];

  const columns = [];
  if (rows.length > 0) {
    const fields = Object.keys(rows[0]);
    fields.forEach((field) => {
      let header = '';
      if (field === 'project') {
        return;
      }
      switch (field) {
        case 'id':
          header = 'ID';
          break;
        case 'name':
          header = 'Name';
          break;
        case 'description':
          header = 'Description';
          break;
        case 'theme':
          header = 'Theme';
          break;
        default:
          header = field;
      }
      columns.push({ field, headerName: header, flex: 1 });
    });

    const projectInfoField = {
      field: 'project',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box className={classes.actionItem}>
          <Tooltip title="View project" placement="bottom">
            <Avatar className={clsx(classes.dark, classes.viewAction)}>
              <ArrowRight onClick={handleOpenEditDialog} />
              <CustomDialog
                open={editDialogOpen}
                handleClose={handleCloseEditDialog}
              >
                <ProjectDetails projectDetails={params.value} />
              </CustomDialog>
            </Avatar>
          </Tooltip>
        </Box>
      )
    };

    columns.push(projectInfoField);
  }

  const projectData = { columns, rows };

  return (
    <Page title="Projects" className={classes.root}>
      <Container maxWidth={false}>
        <div className={classes.gridWrapper}>
          <DataGrid
            {...projectData}
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

AgentProjects.propTypes = {
  agentDetails: PropTypes.object
};

export default AgentProjects;
