/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import top100Films from 'src/data/films';

/* eslint-disable */
const ComboBox = ({ label, value, data, name, onChange }) => {
  return (
    <Autocomplete
      id="combo-box"
      name={name}
      value={value}
      onChange={onChange}
      options={data}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label={label} name={name} variant="outlined" />
      )}
    />
  );
};

ComboBox.propTypes = {
  label: PropTypes.string,
  data: PropTypes.object
};

export default ComboBox;
