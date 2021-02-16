import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Page from 'src/components/Page';

import { axiosWithAuth } from 'src/utils/axios';

import TabPanel from '../../components/TabPanel';
import AgentDetails from './AgentDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  tab: {
    color: 'rgb(33, 150, 243)'
  },
  padTop: {
    paddingTop: '2em'
  }
}));

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const MyAccount = () => {
  const classes = useStyles();

  // const { profileData } = props;

  const [user, setUser] = useState({});
  console.log(user);

  useEffect(() => {
    axiosWithAuth()
      .get('/auth/me')
      .then(({ data }) => {
        setUser(data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Agent Profile" maxWidth={false}>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
              textColor="primary"
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Projects" {...a11yProps(1)} />
              <Tab label="Performance" {...a11yProps(1)} />
            </Tabs>
          </Grid>

          <TabPanel value={value} index={0}>
            <Grid container spacing={3} className={classes.padTop}>
              <AgentDetails />
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
                <div>Agent Performance</div>
              </Grid>
            </Grid>
          </TabPanel>
        </Container>
      </div>
    </Page>
  );
};

export default MyAccount;
