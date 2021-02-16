import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/TabPanel';
import AgentDetails from "./AgentDetails";


import Page from 'material-ui-shell/lib/containers/Page/Page';

import { axiosWithAuth } from 'utils/axios';



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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyAccount = (props) => {
  const classes = useStyles();
  const intl = useIntl();

  const {
    profileData
  } = props;

  const [user, setUser] = useState({});

  useEffect(() => {
    axiosWithAuth()
    .get('/auth/me')
    .then(({data}) => {
      debugger
      setUser(data.data.attributes);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'agent_info',
        defaultMessage: 'Agent Profile',
      })}
      className={classes.root}
    >

    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example"
          variant="fullWidth"
          textColor="primary"
          >
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Projects" {...a11yProps(1)} />
            <Tab label="Performance" {...a11yProps(1)} />
          </Tabs>
        </Grid>

        <TabPanel value={value} index={0}>
          <Grid
            container
            spacing={3}
            >
            <AgentDetails />
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid
            container
            spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
            
            </Grid>
          </Grid>
        </TabPanel>


      </Container>
    
    </div>
   
    </Page>
  );
};

export default MyAccount;
