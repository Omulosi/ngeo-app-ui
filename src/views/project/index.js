import React from 'react';
/* eslint-disable */
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { useSnackbar } from 'notistack';
import LineProgress from 'src/components/LineProgress';
import useUser, { useUserProjects } from 'src/data';
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

  const { data: user, error: userError } = useUser();

  if (userError) {
    console.log(userError);
  }

  let userPk = null;
  if (user) {
    userPk = user.attributes.pk;
  }

  // get projects for currently logged in user
  const { data, loading, error } = useUserProjects(userPk);

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Unable to fetch projects for this user', {
      variant: 'error'
    });
  }

  let projectData = [];
  if (data) {
    projectData = data.features;
  }

  return (
    <Page title="Projects" className={classes.root}>
      <div className={classes.progress}>{loading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <PageToolbar title="Projects" />
        <DisplayProjects projects={projectData ? projectData : []} />
      </Container>
    </Page>
  );
};

export default Projects;
