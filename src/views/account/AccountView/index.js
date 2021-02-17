import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Page from 'src/components/Page';
import TabPanel from 'src/components/TabPanel';
import LineProgress from 'src/components/LineProgress';
import useUser from 'src/data';
import Password from './Password';
import Profile from './Profile';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(5)
  },
  tab: {
    color: 'rgb(33, 150, 243)'
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
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useUser();

  if (error) {
    enqueueSnackbar('Error loading profile data', {
      variant: 'error'
    });
  }

  let user = {};
  if (data) {
    user = data.attributes;
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="My Account" className={classes.root}>
      <>{loading && <LineProgress />}</>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
              textColor="secondary"
            >
              <Tab label="Profile" {...a11yProps(0)} />
              <Tab label="security" {...a11yProps(1)} />
            </Tabs>
          </Grid>

          <TabPanel value={value} index={0}>
            <Profile user={user} />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} xs={12}>
                <Password />
              </Grid>
            </Grid>
          </TabPanel>
        </div>
      </Container>
    </Page>
  );
};

MyAccount.propTypes = {
  profileData: PropTypes.object
};

export default MyAccount;
