import React from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
// import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { terms as termsDict } from 'src/config';

const useStyles = makeStyles(() => ({
  root: {}
}));

/* eslint-disable */
const EditAgent = ({ agentDetails }) => {
  const { terms } = agentDetails;

  const defaultTerm = termsDict[terms];

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      terms: defaultTerm || ''
    },
    onSubmit: (values, { setSubmitting }) => {
      // dispatch(login(values, navigate, enqueueSnackbar, setSubmitting));
      console.log(values);
      setSubmitting(false);
    }
  });

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root)}
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader title="Assign Project" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Project"
                name="project"
                select
                SelectProps={{ native: true }}
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.terms}
              >
                <option key="1232" value="" />
                {Object.entries(termsDict).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default EditAgent;
