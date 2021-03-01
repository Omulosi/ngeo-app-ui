import React, { useEffect } from 'react';
import clsx from 'clsx';
// import * as Yup from 'yup';
import { useFormik } from 'formik';
// import PropTypes from 'prop-types';
/* eslint-disable */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  FormHelperText
} from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { assignArea } from 'src/redux/actions/areaAction';
import useUser from 'src/data';
import ComboBox from './ComboBox';
import adminData from 'src/data/adminData';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  content: {
    marginTop: theme.spacing(2)
  },
  header: {
    color: '#263228',
    fontSize: '1.5rem'
  },
  error: {
    textAlign: 'left',
    padding: '1em'
  }
}));

const AddArea = ({ user }) => {
  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  // // get currently logged in user pk
  // const { data: user, error: userError } = useUser();

  // if (userError) {
  //   console.log(userError);
  // }

  // let userPk = null;
  // if (user) {
  //   userPk = user.attributes.pk;
  // }

  const error = useSelector((state) => state.agent.agentError, shallowEqual);

  const formik = useFormik({
    initialValues: {
      county: '',
      sub_county: '',
      ward: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        assignArea(
          { ...values, ...user },
          navigate,
          enqueueSnackbar,
          setSubmitting
        )
      );
    }
  });

  const handleChange = (e, value, name) => {
    formik.setFieldValue(
      name,
      value !== null ? value.name : formik.initialValues[name]
    );
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.content)}
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader title="Assign an area" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <ComboBox
                label="County"
                name="county"
                data={adminData.counties}
                onChange={(e, value) => {
                  handleChange(e, value, 'county');
                }}
              />
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <ComboBox
                label="Sub County"
                name="sub_county"
                data={adminData.subCounties}
                onChange={(e, value) => {
                  handleChange(e, value, 'sub_county');
                }}
              />
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <ComboBox
                label="Ward"
                name="ward"
                data={adminData.wards}
                onChange={(e, value) => {
                  handleChange(e, value, 'ward');
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <FormHelperText className={classes.error} error>
          {' '}
          {error && error}
        </FormHelperText>
        <Box display="flex" justifyContent="flex-start" p={2}>
          <Button color="primary" variant="contained" type="submit">
            Assign
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AddArea;
