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

  const iconMarkers = features.map((property) => {
    let latLng = property.geometry.coordinates;
    if (property.geometry.type === 'MultiPoint') {
      [latLng] = property.geometry.coordinates;
    }
    const [lng, lat] = latLng; // first elem is longitude

    return (
      <Marker key={uuid()} position={[lat, lng]} icon={icon}>
        <CustomPopup property={property} latLng={[lat, lng]} />
      </Marker>
    );
  });

  return <>{iconMarkers}</>;
};

LocationMarkers.propTypes = {
  markers: PropTypes.object,
  icon: PropTypes.any
};

export default LocationMarkers;
