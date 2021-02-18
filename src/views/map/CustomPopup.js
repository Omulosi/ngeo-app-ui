import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-leaflet';
import { makeStyles } from '@material-ui/core/styles';
import 'react-tabs/style/react-tabs.css';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
  content: {
    minWidth: '200px'
  },
  table: {
    width: '100px'
  },
  input: {
    border: 'none',
    margin: '0',
    width: '100%',
    padding: '5px',
    textAlign: 'left',
    color: 'black',
    background: 'transparent'
  },
  inputWrapper: {
    border: '1px solid #ccc',
    background: '#f7f7f7',
    width: '50%',
    display: 'inline-block'
  },
  btn: {
    marginTop: '5%',
    borderRadius: '0'
  },
  tablist: {
    marginTop: '2%',
    width: '100%',
    marginBottom: '5%',
    borderBottom: '1px solid #ccc'
  },
  panel: {
    paddingBottom: '4%'
  }
});

const CustomPopup = ({ property, latLng }) => {
  let info = property ? property.properties : {};
  let coords = {};

  if (property) {
    coords = {
      ...coords,
      latitude: latLng[0],
      longitude: latLng[1]
    };
  }

  info = { ...info, ...coords };

  const entries = Object.entries(info);

  const elems = entries
    .map(([key, value]) => {
      if (key !== 'objectid' && key !== 'foo' && key !== 'altitude') {
        return (
          <tr>
            <td className="property-key">{key}</td>
            <td>{value}</td>
          </tr>
        );
      }
      return null;
    })
    .filter((e) => e !== null);

  const classes = useStyles();

  return (
    <Popup className="custom-popup">
      <div className={classes.content}>
        <table className="metadata">
          <tbody className="property-table">{elems}</tbody>
        </table>
        <Divider />
      </div>
    </Popup>
  );
};

CustomPopup.propTypes = {
  property: PropTypes.object,
  latLng: PropTypes.array
};

export default CustomPopup;
