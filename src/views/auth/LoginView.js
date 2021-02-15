import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import RFTextField from 'src/components/TextField';
import FormWrapper from 'src/components/FormWrapper';
import Copyright from 'src/components/Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(4, 3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 6)
    }
  },
  header: {
    textTransform: 'uppercase',
    marginBottom: '0.2em',
    lineHeight: '1.7',
    fontWeight: '700',
    fontFamily: 'Roboto Condensed, sans-serif',
    fontSize: '42px',
    color: 'rgba(0,0,0,0.87)'
  },
  tagline: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.4'
  },
  form: {
    marginTop: '3em'
  },
  field: {
    borderRadius: '0 !important'
  },
  btn: {
    padding: '16px 40px',
    boxShadow: 'none',
    borderRadius: '0',
    background: 'rgb(0,115,230)'
  },
  link: {
    color: '#0073e6'
  }
}));

/* eslint-disable */
const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page className={classes.root} title="Login">
      <FormWrapper>
        <Container maxWidth="sm">
          <>
            <Typography
              variant="h2"
              gutterBottom
              marked="center"
              align="center"
              className={classes.header}
            >
              Sign In
            </Typography>
            <Typography variant="body2" align="center">
              {'Not a member yet? '}
              <Link
                component={RouterLink}
                to="/register"
                variant="h6"
                underline="always"
                className={classes.link}
              >
                {'Sign Up here'}
              </Link>
            </Typography>
          </>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <RFTextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  size="large"
                  required
                />
                <RFTextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  className={classes.field}
                  size="large"
                  required
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    className={classes.btn}
                  >
                    Sign in
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Typography align="center">
            <Link
              underline="always"
              to="/forgot-password/"
              component={RouterLink}
              className={classes.link}
            >
              Forgot password?
            </Link>
          </Typography>
        </Container>
      </FormWrapper>

      <Copyright />
    </Page>
  );
};

export default LoginView;
