import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-leaflet';
import uuid from 'react-uuid';
import { greenIcon } from '../icons';
import CustomPopup from '../CustomPopup';

const ProjectLayer = ({ features = [] }) => {
  const iconMarkers = features.map((ft) => (
    <Marker key={uuid()} position={ft.geometry.coordinates} icon={greenIcon}>
      <CustomPopup property={ft} />
    </Marker>
  ));

  return <>{iconMarkers}</>;
};

ProjectLayer.propTypes = {
  features: PropTypes.array
};

export default ProjectLayer;
