import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useParams } from 'react-router';
import ReturnChart from 'src/components/ReturnChart';
import { useAgent } from 'src/hooks/agents';
import AgentPerformanceSummary from './AgentPerformanceSummary';

const useStyles = makeStyles(() => ({
  root: {}
}));

/* eslint-disable */
const AgentPerformance = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useAgent(id);
  debugger;
  return (
    <div className={classes.root}>
      <ReturnChart data={data} />
      <AgentPerformanceSummary data={data} />
    </div>
  );
};

export default AgentPerformance;
