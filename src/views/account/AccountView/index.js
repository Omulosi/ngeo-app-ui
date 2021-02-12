import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import TabPanel from 'src/components/TabPanel';
import ProfileDetails from './ProfileDetails';
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

const MyAccount = (props) => {
  const classes = useStyles();

  const { profileData } = props;

  const firstName = 'John';
  const lastName = 'Mulongo';
  const role = 'Field Outreach Officer';

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="My Account" className={classes.root}>
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
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <Profile role={role} fullName={`${firstName} ${lastName}`} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <ProfileDetails profileDetails={profileData} />
              </Grid>
            </Grid>
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
