import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
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
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import ComboBox from './ComboBox';

/* eslint-disable */
const useStyles = makeStyles(() => ({
  root: {},
  info: {
    textAlign: 'left',
    color: 'blue',
    padding: '1em'
  }
}));

const AssignResource = ({ title, fieldLabel, resourceList, data, action }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      resource: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        action(
          { resourceId: values.resource.id, data },
          navigate,
          enqueueSnackbar,
          setSubmitting
        )
      );
    }
  });

  const handleChange = (e, value) => {
    formik.setFieldValue(
      'resource',
      value !== null ? value : formik.initialValues.resourceId
    );
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root)}
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader title={title} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <ComboBox
                label={fieldLabel}
                name="resource"
                data={resourceList}
                onChange={(e, value) => {
                  handleChange(e, value);
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <FormHelperText className={classes.info}>
          {resourceList.length > 0
            ? ''
            : `You currently have no available ${fieldLabel.toLowerCase()}s to assign`}
        </FormHelperText>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

AssignResource.propTypes = {
  title: PropTypes.string,
  fieldLabel: PropTypes.string,
  /**
   * An array of objects.
   * Each object must have a key named 'id',
   * and a corresponding value named 'name'
   */
  resourceList: PropTypes.array,
  assigneeId: PropTypes.string,
  action: PropTypes.func
};

export default AssignResource;
