import React from 'react';
/* eslint-disable */
// import PropTypes from 'prop-types';
import { makeStyles, Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Edit } from 'react-feather';
import moment from 'moment';
import { useProject } from 'src/hooks/projects';
import DetailsDisplay from 'src/components/DetailsDisplay';
import Page from 'src/components/Page';
import DataGridToolbar from 'src/components/DataGridToolbar';
import ProjectInfo from 'src/components/ProjectInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  gridWrapper: {
    height: '80vh',
    width: '100%'
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewAction: {
    marginLeft: '0.7rem'
  }
}));

const ProjectDetails = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { data, isLoading, error, isSuccess } = useProject(id);

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Unable to fetch project data', {
      variant: 'error'
    });
  }

  let projectDetails = {};
  if (isSuccess) {
    projectDetails = data.attributes;
  }

  return (
    <Page title="Project Info" className={classes.root}>
      <Container maxWidth={false}>
        <DataGridToolbar
          pageTitle="Project Info"
          navLink={`/app/projects/edit/${id}`}
          btnIcon={<Edit />}
          btnTitle="Edit Project"
          btnDisabled={true}
        />
        <ProjectInfo projectDetails={projectDetails} />
      </Container>
    </Page>
  );
};

export default ProjectDetails;
