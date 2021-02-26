import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Page from 'src/components/Page';
import PageToolbar from 'src/components/PageToolbar';
import { useFieldOfficer } from 'src/data';
import LineProgress from 'src/components/LineProgress';
import TabPanel from 'src/components/TabPanel';
// import AgentProjects from './AgentProjects';
// import Returns from './Returns';
// import DetailsDisplay from 'src/components/DetailsDisplay';
import DisplayAgents from 'src/components/DisplayAgents';
import DisplayProjects from 'src/components/DisplayProjects';
import FieldOfficerInfo from './FieldOfficerInfo';
import AssignProject from './AssignProject';
import AssignArea from './AssignArea';

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
    paddingTop: theme.spacing(2)
  },
  toolbar: {}
}));

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const FieldOfficerProfile = () => {
  const classes = useStyles();

  // const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const { data, loading, error } = useFieldOfficer(id);

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Unable to fetch field officer profile data', {
      variant: 'error'
    });
  }

  let details = {};
  if (data) {
    details = { ...data.attributes.user, foId: data.id };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Field Officer Profile" className={classes.root}>
      <div className={classes.progress}>{loading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <PageToolbar
          title={details ? `${details.first_name} ${details.last_name}` : ''}
        />
        <Grid container className={classes.content}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
            textColor="primary"
          >
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Projects" {...a11yProps(1)} />
            <Tab label="Agents" {...a11yProps(1)} />
          </Tabs>
        </Grid>

        <TabPanel value={value} index={0}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item xl={4} lg={6} md={6} xs={12}>
              <FieldOfficerInfo details={details} />
            </Grid>
            <Grid item xl={4} lg={6} md={6} xs={12}>
              <AssignProject fieldOfficerDetails={details} />
            </Grid>
            <Grid item xl={4} lg={6} md={6} xs={12}>
              <AssignArea fieldOfficerDetails={details} />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item lg={12} md={12} xs={12}>
              <DisplayProjects
                projects={data ? data.attributes.projects.features : []}
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item lg={12} md={12} xs={12}>
              <DisplayAgents
                agents={data ? data.attributes.agents : []}
                agentBaseUrl="/app/field_officers/agents"
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Page>
  );
};

export default FieldOfficerProfile;
