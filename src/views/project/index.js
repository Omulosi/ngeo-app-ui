import React from 'react';
/* eslint-disable */
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { useSnackbar } from 'notistack';
import LineProgress from 'src/components/LineProgress';
import useUser from 'src/hooks/user';
import { useProjects } from 'src/hooks/projects';
import DisplayProjects from 'src/components/DisplayProjects';
import PageToolbar from 'src/components/PageToolbar';

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
  }
}));

const Projects = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // get projects for currently logged in user
  const { data, isLoading, error, isSuccess } = useProjects();

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Unable to fetch projects for this user', {
      variant: 'error'
    });
  }

  let projectData = [];
  if (isSuccess) {
    projectData = data.results.features;
  }

  return (
    <Page title="Projects" className={classes.root}>
      <div className={classes.progress}>{isLoading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <PageToolbar title="Projects" />
        <DisplayProjects projects={projectData ? projectData : []} />
      </Container>
    </Page>
  );
};

export default Projects;
