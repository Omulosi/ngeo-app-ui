import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles,
  Container
} from '@material-ui/core';
import DataGridToolbar from 'src/components/DataGridToolbar';
import Page from 'src/components/Page';
import ReturnChart from 'src/components/ReturnChart';

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

const ManageAgents = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Page title="Manage Agents" className={classes.root}>
      <Container maxWidth={false}>
        <DataGridToolbar pageTitle="Manage Agents" />
        <div>
          <ReturnChart />
        </div>
        <form className={clsx(classes.root, className)} {...rest}>
          <Card>
            <CardHeader
              subheader="Manage the notifications"
              title="Notifications"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={6} wrap="wrap">
                <Grid className={classes.item} item md={4} sm={6} xs={12}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    Notifications
                  </Typography>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Email"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Push Notifications"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Text Messages"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Phone calls"
                  />
                </Grid>
                <Grid className={classes.item} item md={4} sm={6} xs={12}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    Messages
                  </Typography>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Email"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Push Notifications"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Phone calls"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button color="primary" variant="contained">
                Save
              </Button>
            </Box>
          </Card>
        </form>
      </Container>
    </Page>
  );
};

ManageAgents.propTypes = {
  className: PropTypes.string
};

export default ManageAgents;
