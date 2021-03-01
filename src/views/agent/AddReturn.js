// import React, { useEffect } from 'react';
// import clsx from 'clsx';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
// // import PropTypes from 'prop-types';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   Grid,
//   TextField,
//   makeStyles,
//   Container,
//   Typography,
//   FormHelperText
// } from '@material-ui/core';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { useSnackbar } from 'notistack';
// import { useNavigate } from 'react-router-dom';
// // import { terms as termsDict } from 'src/config';
// import Page from 'src/components/Page';
// import { createAgent } from 'src/redux/actions/agentActions';
// import useUser from 'src/data';
// import MarkdownEditor from 'src/components/MarkDownEditor';
// import ComboBox from 'src/components/ComboBox';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     minHeight: '100%',
//     paddingBottom: theme.spacing(3),
//     paddingTop: theme.spacing(3)
//   },
//   formControl: {
//     marginTop: theme.spacing(2),
//     minWidth: 120
//   },
//   content: {
//     marginTop: theme.spacing(2)
//   },
//   header: {
//     color: '#263228',
//     fontSize: '1.5rem'
//   },
//   error: {
//     textAlign: 'center'
//   }
// }));

// const AddReturn = () => {
//   const classes = useStyles();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { enqueueSnackbar } = useSnackbar();

//   useEffect(() => {
//     dispatch({ type: 'CLEAR_ERRORS' });
//   }, [dispatch]);

//   const error = useSelector((state) => state.agent.agentError, shallowEqual);

//   // get currently logged in user pk
//   const { data: user, error: userError } = useUser();

//   if (userError) {
//     console.log(userError);
//   }

//   let userPk = null;
//   if (user) {
//     userPk = user.attributes.pk;
//   }

//   // Get list of agents and projects for this user:
//   // const projectList = [];
//   const agentList = [];

//   const formik = useFormik({
//     initialValues: {
//       date_submitted: '',
//       project: '',
//       agent: '',
//       rating: '',
//       progress_report: '',
//       remarks: '**Add remarks**'
//     },
//     validationSchema: Yup.object().shape({
//       date_submitted: Yup.string(),
//       // project name
//       project: Yup.string(),
//       rating: Yup.number()
//       //   progress_report: Yup.string(),
//     }),
//     onSubmit: (values, { setSubmitting }) => {
//       dispatch(
//         createAgent(
//           { ...values, userPk },
//           navigate,
//           enqueueSnackbar,
//           setSubmitting
//         )
//       );
//     }
//   });

//   const handleAgentChange = (e, value) => {
//     formik.setFieldValue(
//       'agent',
//       value !== null ? value : formik.initialValues.agent
//     );
//   };

//   // const handleProjectChange = (e, value) => {
//   //   formik.setFieldValue(
//   //     'project',
//   //     value !== null ? value : formik.initialValues.project
//   //   );
//   // };

//   return (
//     <Page className={classes.root} title="Add new Return">
//       <Container maxWidth="lg">
//         <Typography variant="h1" component="h1" className={classes.header}>
//           Add a new return
//         </Typography>
//         <Box className={classes.content}>
//           <form
//             autoComplete="off"
//             noValidate
//             className={clsx(classes.content)}
//             onSubmit={formik.handleSubmit}
//           >
//             <Card>
//               <CardHeader title="Add Return" />
//               <Divider />
//               <CardContent>
//                 <Grid container spacing={3}>
//                   <Grid item md={6} xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Submission Date"
//                       name="date_submitted"
//                       required
//                       variant="outlined"
//                       type="datetime-local"
//                       InputLabelProps={{
//                         shrink: true
//                       }}
//                       value={formik.values.date_submitted}
//                       onBlur={formik.handleBlur}
//                       onChange={formik.handleChange}
//                     />
//                     <Divider style={{ marginTop: '1em' }} />
//                   </Grid>
//                   <Grid item md={6} xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Project Name"
//                       name="project"
//                       required
//                       variant="outlined"
//                       value={formik.values.project}
//                       onBlur={formik.handleBlur}
//                       onChange={formik.handleChange}
//                     />
//                   </Grid>

//                   <Grid item md={6} xs={12}>
//                     <ComboBox
//                       label="Agent"
//                       name="agent"
//                       data={agentList}
//                       onChange={(e, value) => {
//                         handleAgentChange(e, value);
//                       }}
//                     />
//                   </Grid>
//                   <Grid item md={6} xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Rating"
//                       name="rating"
//                       type="number"
//                       required
//                       variant="outlined"
//                       value={formik.values.rating}
//                       onBlur={formik.handleBlur}
//                       onChange={formik.handleChange}
//                     />
//                   </Grid>
//                   <Grid item md={6} xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Upload Return"
//                       name="progress_report"
//                       variant="outlined"
//                       value={formik.values.progress_report}
//                       onBlur={formik.handleBlur}
//                       onChange={formik.handleChange}
//                     />
//                   </Grid>
//                   <Grid item md={12} xs={12}>
//                     <MarkdownEditor
//                       fullWidth
//                       label="Remarks"
//                       name="remarks"
//                       value={formik.values.remarks}
//                       onBlur={formik.handleBlur}
//                       onChange={formik.handleChange}
//                     />
//                   </Grid>
//                 </Grid>
//               </CardContent>
//               <Divider />
//               <Box display="flex" justifyContent="flex-end" p={2}>
//                 <Button
//                   color="primary"
//                   variant="outlined"
//                   style={{ marginRight: '0.5em' }}
//                   onClick={() => navigate(-1)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button color="primary" variant="contained" type="submit">
//                   Add Agent
//                 </Button>
//               </Box>
//               <FormHelperText className={classes.error} error>
//                 {' '}
//                 {error && error}
//               </FormHelperText>
//             </Card>
//           </form>
//         </Box>
//       </Container>
//     </Page>
//   );
// };

// export default AddReturn;
