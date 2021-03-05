import React from 'react';
import { makeStyles } from '@material-ui/core';
import ReturnChart from 'src/components/ReturnChart';
import AgentPerformanceSummary from './AgentPerformanceSummary';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AgentPerformance = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ReturnChart />
      <AgentPerformanceSummary />
    </div>
  );
};

export default AgentPerformance;
