import React from 'react';
/* eslint-disable */
import { Button, Container, Grid, Box, makeStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import Page from 'src/components/Page';
import { useAgent } from 'src/data';

import LineProgress from 'src/components/LineProgress';
import TabPanel from '../../components/TabPanel';
// import AgentDetails from './AgentDetails';
import AgentInfo from './AgentInfo';
import AssignProject from './AssignProject';
import AssignRating from './AssignRating';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(5)
  },
  tab: {
    color: 'rgb(33, 150, 243)'
  },
  padTop: {
    paddingTop: '2em'
  },
  content: {
    paddingTop: theme.spacing(3)
  },
  toolbar: {}
}));

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const AgentProfile = () => {
  const classes = useStyles();

  // const { profileData } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const { data, loading, error } = useAgent(id);

  if (error) {
    if (error) {
      console.log(`Error => ${error}`);
      enqueueSnackbar('Unable to fetch profile data', {
        variant: 'info'
      });
    }
  }

  let agentDetails = {};
  // let agentRelationships = {};
  if (data) {
    agentDetails = data.attributes;
    // agentRelationships = data.relationships;
  }

  // useAgent - agent details + returns
  // useReturns - agent returns
  // pass agent details to details component
  // pass foos projects to assign project component - check if already assigned to agent and ignore/skip
  // pass returns to assign returns

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Agent Profile" className={classes.root}>
      <div className={classes.progress}>{loading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Box display="flex" justifyContent="flex-start">
              <Button color="primary" variant="contained">
                Edit Agent
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} className={classes.content}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
            textColor="primary"
          >
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Projects" {...a11yProps(1)} />
            <Tab label="Returns" {...a11yProps(1)} />
          </Tabs>
        </Grid>

        <TabPanel value={value} index={0}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item xl={3} lg={4} md={6} xs={12}>
              <AgentInfo />
            </Grid>
            <Grid item xl={3} lg={4} md={6} xs={12}>
              <AssignProject agentDetails={agentDetails} />
            </Grid>
            <Grid item xl={3} lg={4} md={6} xs={12}>
              <AssignRating agentDetails={agentDetails} />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item lg={12} md={12} xs={12}>
              <div>Agent Projects</div>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item lg={12} md={12} xs={12}>
              <div>{`Rating: ${agentDetails.rating}`}</div>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Page>
  );
};

export default AgentProfile;
