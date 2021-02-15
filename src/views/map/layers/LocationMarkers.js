import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { Marker } from 'react-leaflet';
import CustomPopup from '../CustomPopup';

const LocationMarkers = ({ markers, icon }) => {
  let features = [];
  if (markers.features) {
    features = markers.features;
  }

  const iconMarkers = features.map((property) => (
    <Marker key={uuid()} position={property.geometry.coordinates} icon={icon}>
      <CustomPopup property={property} />
    </Marker>
  ));

  return <>{iconMarkers}</>;
};

LocationMarkers.propTypes = {
  markers: PropTypes.object,
  icon: PropTypes.any
};

export default LocationMarkers;
