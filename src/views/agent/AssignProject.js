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
// import { terms as termsDict } from 'src/config';
import useUser, { useUserProjects } from 'src/data';
import { assignProjectToAgent } from 'src/redux/actions/projectActions';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {}
}));

/* eslint-disable */
const AssignProject = ({ agentDetails }) => {
  const { agentId } = agentDetails;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data: user, loading: useLoading, error: userError } = useUser();

  if (userError) {
    // enqueueSnackbar(
    //   'You are using the application as a general user. Log in to access more features',
    //   {
    //     variant: 'info'
    //   }
    // );
    console.log(userError);
  }

  let userPk = null;
  if (user) {
    userPk = user.attributes.pk;
  }

  // get projects for currently logged in field officer/user
  const {
    data: projects,
    loading: projectsLoading,
    error: projectsError
  } = useUserProjects(userPk);

  let projectList = [];
  if (projects) {
    projectList = projects.map((project) => {
      return {
        id: project.id,
        name: project.attributes.name,
        assignedTo: project.relationships.agent.data
      };
    });
  }

  projectList = projectList.filter((project) => !project.assignedTo);

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      projectId: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        assignProjectToAgent(
          { ...values, agentId },
          navigate,
          enqueueSnackbar,
          setSubmitting
        )
      );
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
                name="projectId"
                select
                SelectProps={{ native: true }}
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.projectId}
              >
                <option key="#" value="" />
                {projectList.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
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

export default AssignProject;
