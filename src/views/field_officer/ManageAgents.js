import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import DataGridToolbar from 'src/components/DataGridToolbar';
import Page from 'src/components/Page';
import ReturnChart from 'src/components/ReturnChart';
import AgentPerformanceSummary from '../agent/AgentPerformanceSummary';
import SwitchesGroup from './SwitchesGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const ManageAgents = () => {
  const classes = useStyles();

  return (
    <Page title="Manage Agents" className={classes.root}>
      <Container maxWidth={false}>
        <DataGridToolbar pageTitle="Manage Agents" />
        <div>
          <ReturnChart />
          <AgentPerformanceSummary />
          <SwitchesGroup className={classes.root} />
        </div>
      </Container>
    </Page>
  );
};

export default ManageAgents;
