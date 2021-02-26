import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { Marker } from 'react-leaflet';
import CustomPopup from '../CustomPopup';

/* eslint-disable */
const PointMarkers = ({ markers, icon }) => {
  let features = [];
  if (markers.features) {
    features = markers.features;
  }

  const iconMarkers = features.map((property) => {
    // point type geometry has no nested array, unlike multipoint -
    // so no array destructring
    const latLng = property.geometry.coordinates;
    const lng = latLng[0];
    const lat = latLng[1];
    return (
      <Marker key={uuid()} position={[lat, lng]} icon={icon}>
        <CustomPopup property={property} latLng={[lat, lng]} />
      </Marker>
    );
  });

  return <>{iconMarkers}</>;
};

PointMarkers.propTypes = {
  markers: PropTypes.object,
  icon: PropTypes.any
};

export default PointMarkers;
