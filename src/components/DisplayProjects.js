import React from 'react';
/* eslint-disable */
import clsx from 'clsx';
import { ArrowRight } from 'react-feather';
import { Container, makeStyles, Box, Tooltip, Avatar } from '@material-ui/core';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
// import { useAxios } from 'src/utils/axios';
import LineProgress from 'src/components/LineProgress';
import useUser, { useUserProjects } from 'src/data';
import DataGridDisplay from 'src/components/DataGridDisplay';
// import { Scrollbars } from 'react-custom-scrollbars';
import PageToolbar from './PageToolbar';

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

const DisplayProjects = ({ projects = [] }) => {
  const classes = useStyles();

  const navigate = useNavigate();

  /* eslint-disable */
  const rows = projects
    ? projects.map((p) => {
        return { id: p.id, ...p.properties, project: { id: p.id } };
      })
    : [];

  const columns = [];
  if (rows.length > 0) {
    const fields = Object.keys(rows[0]);
    fields.forEach((field) => {
      let header = '';
      // skip field with project object
      if (field === 'county_manager') {
        return;
      }
      if (field === 'agent') {
        return;
      }
      if (field === 'field_officer') {
        return;
      }
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
              <ArrowRight
                onClick={() => navigate(`/app/projects/${params.value.id}`)}
              />
            </Avatar>
          </Tooltip>
        </Box>
      )
    };

    columns.push(projectInfoField);
  }

  const projectData = { columns, rows };

  return <DataGridDisplay data={projectData} />;
};

export default DisplayProjects;
