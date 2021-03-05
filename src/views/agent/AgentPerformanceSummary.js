import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import TotalsCard from 'src/components/reports/TotalsCard';
import ProgressCard from 'src/components/reports/ProgressCard';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1)
  }
}));

const AgentPerformanceSummary = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <TotalsCard
          title="TOTAL PROJECTS"
          totalsValue="10"
          percentChange="5%"
          changeDuration="Since last month"
          icon={<FolderIcon />}
        />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <TotalsCard
          title="TOTAL PETURNS"
          totalsValue="3"
          percentChange="1%"
          changeDuration="Since last week"
        />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <ProgressCard title="PROGRESS" progress={60} />
      </Grid>
    </Grid>
  );
};

export default AgentPerformanceSummary;
