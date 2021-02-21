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

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  }
}));

/* eslint-disable */
const EditAgent = ({ agentDetails }) => {
  const {
    first_name,
    last_name,
    id_number,
    phone_number,
    rating,
    terms
  } = agentDetails;

  const defaultTerm = termsDict[terms];

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      firstName: first_name || '',
      lastName: last_name || '',
      idNumber: id_number || '',
      phoneNumber: phone_number || '',
      rating: rating || '',
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
        <CardHeader title="Edit agent info" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                required
                variant="outlined"
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                required
                variant="outlined"
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="number"
                variant="outlined"
                value={formik.values.phoneNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="ID Number"
                name="idNumber"
                type="number"
                variant="outlined"
                value={formik.values.idNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Terms"
                name="terms"
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.terms}
              >
                <option key="#default" value={terms}>
                  {defaultTerm}
                </option>
                {Object.entries(termsDict).map(([key, value]) =>
                  value !== 'Casual' ? (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ) : null
                )}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default EditAgent;
