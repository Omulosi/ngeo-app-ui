import React from 'react';
// Import to a different variable so you don't have to update the rest of your codes
import MeasureControlDefault from 'react-leaflet-measure';
import { withLeaflet } from 'react-leaflet';

const measureOptions = {
  position: 'topright',
  primaryLengthUnit: 'meters',
  secondaryLengthUnit: 'kilometers',
  primaryAreaUnit: 'sqmeters',
  secondaryAreaUnit: 'acres',
  activeColor: '#db0000',
  completedColor: '#9b2d14'
};

const MeasureControlComponent = () => {
  // Wrap our new variable and assign it to the one we used before.
  // The rest of the codes stays the same.
  const MeasureControl = withLeaflet(MeasureControlDefault);

  return <MeasureControl {...measureOptions} />;
};

export default MeasureControlComponent;
