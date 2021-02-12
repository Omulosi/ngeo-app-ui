// import React, { useState } from 'react';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   Grid,
//   TextField,
//   makeStyles
// } from '@material-ui/core';

// const states = [
//   {
//     value: 'alabama',
//     label: 'Alabama'
//   },
//   {
//     value: 'new-york',
//     label: 'New York'
//   },
//   {
//     value: 'san-francisco',
//     label: 'San Francisco'
//   }
// ];

// const useStyles = makeStyles(() => ({
//   root: {}
// }));

// const ProfileDetails = ({ className, ...rest }) => {
//   const classes = useStyles();
//   const [values, setValues] = useState({
//     firstName: 'Katarina',
//     lastName: 'Smith',
//     email: 'demo@devias.io',
//     phone: '',
//     state: 'Alabama',
//     country: 'USA'
//   });

//   const handleChange = (event) => {
//     setValues({
//       ...values,
//       [event.target.name]: event.target.value
//     });
//   };

//   return (
//     <form
//       autoComplete="off"
//       noValidate
//       className={clsx(classes.root, className)}
//       {...rest}
//     >
//       <Card>
//         <CardHeader
//           subheader="The information can be edited"
//           title="Profile"
//         />
//         <Divider />
//         <CardContent>
//           <Grid
//             container
//             spacing={3}
//           >
//             <Grid
//               item
//               md={6}
//               xs={12}
//             >
//               <TextField
//                 fullWidth
//                 helperText="Please specify the first name"
//                 label="First name"
//                 name="firstName"
//                 onChange={handleChange}
//                 required
//                 value={values.firstName}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid
//               item
//               md={6}
//               xs={12}
//             >
//               <TextField
//                 fullWidth
//                 label="Last name"
//                 name="lastName"
//                 onChange={handleChange}
//                 required
//                 value={values.lastName}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid
//               item
//               md={6}
//               xs={12}
//             >
//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 name="email"
//                 onChange={handleChange}
//                 required
//                 value={values.email}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid
//               item
//               md={6}
//               xs={12}
//             >
//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 name="phone"
//                 onChange={handleChange}
//                 type="number"
//                 value={values.phone}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid
//               item
//               md={6}
//               xs={12}
//             >
//               <TextField
//                 fullWidth
//                 label="Country"
//                 name="country"
//                 onChange={handleChange}
//                 required
//                 value={values.country}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid
//               item
//               md={6}
//               xs={12}
//             >
//               <TextField
//                 fullWidth
//                 label="Select State"
//                 name="state"
//                 onChange={handleChange}
//                 required
//                 select
//                 SelectProps={{ native: true }}
//                 value={values.state}
//                 variant="outlined"
//               >
//                 {states.map((option) => (
//                   <option
//                     key={option.value}
//                     value={option.value}
//                   >
//                     {option.label}
//                   </option>
//                 ))}
//               </TextField>
//             </Grid>
//           </Grid>
//         </CardContent>
//         <Divider />
//         <Box
//           display="flex"
//           justifyContent="flex-end"
//           p={2}
//         >
//           <Button
//             color="primary"
//             variant="contained"
//           >
//             Save details
//           </Button>
//         </Box>
//       </Card>
//     </form>
//   );
// };

// ProfileDetails.propTypes = {
//   className: PropTypes.string
// };

// export default ProfileDetails;

import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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

const counties = [
  {
    value: 'nairobi',
    label: 'Nairobi'
  },
  {
    value: 'bungoma',
    label: 'Bungoma'
  },
  {
    value: 'narok',
    label: 'Narok'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

/* eslint-disable */
const ProfileDetails = ({ className, profileDetails = {}, ...rest }) => {
  const { firstName, lastName, email, county, phone } = profileDetails;

  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    phone: phone || 'NA',
    county: county || 'Nairobi',
    country: 'KEN'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    pushMessageToSnackbar({
      text: 'Profile updated!'
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      onSubmit={(e) => handleSubmit(e)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select County"
                name="county"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.county}
                variant="outlined"
              >
                {counties.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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

ProfileDetails.propTypes = {
  className: PropTypes.string,
  profileDetails: PropTypes.object
};

export default ProfileDetails;
