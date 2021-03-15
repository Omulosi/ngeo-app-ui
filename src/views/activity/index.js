import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Paper
} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Page from 'src/components/Page';
import TabPanel from 'src/components/TabPanel';
import LineProgress from 'src/components/LineProgress';
import DataGridToolbar from 'src/components/DataGridToolbar';
import BadgeComponent from 'src/components/Badge';
// import useUser from 'src/data';
import useUser from 'src/hooks/user';
import AgentNotification from './AgentNotification';
import AllNotifications from './AllNotification';
import ProjectNotification from './ProjectNotification';

/* eslint-disable */
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
  sidebar: {
    backgroundColor: '#fff',
    padding: theme.spacing(2)
  },
  sidebarContent: {}
}));

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const MyActivity = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const notifications = [
    {
      message: 'Leo Tolstoy was approved for temporary status',
      createdAt: '2021-02-22',
      id: 1
    }
  ];

  const { data, isLoading: loading, isError: error, isSuccess } = useUser();

  if (error) {
    enqueueSnackbar('Error loading profile data', {
      variant: 'error'
    });
  }

  let user = {};
  if (isSuccess) {
    user = data.attributes;
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="My Activity" className={classes.root}>
      <>{loading && <LineProgress />}</>
      <Container maxWidth={false}>
        <DataGridToolbar pageTitle="My Activity" />
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid className={classes.item} item md={9} sm={9} xs={12}>
              <Paper square>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="activity tabs"
                  variant="fullWidth"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  <Tab
                    label="All"
                    icon={<BadgeComponent total={notifications.length} />}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="Agents"
                    icon={<BadgeComponent total={notifications.length} />}
                    {...a11yProps(1)}
                  />
                  <Tab label="Projects" {...a11yProps(1)} />
                </Tabs>
              </Paper>
              <TabPanel value={value} index={0}>
                <AllNotifications notifications={notifications} />
              </TabPanel>

              <TabPanel value={value} index={1}>
                <AgentNotification notifications={notifications} />
              </TabPanel>

              <TabPanel value={value} index={2}>
                <ProjectNotification />
              </TabPanel>
            </Grid>

            <Grid className={classes.sidebar} item md={3} sm={3} xs={12}>
              <div className={classes.sidebarContent}>
                <Typography color="textPrimary" gutterBottom variant="h6">
                  Last Login: <small>yesterday</small>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Page>
  );
};

MyActivity.propTypes = {
  profileData: PropTypes.object
};

export default MyActivity;
