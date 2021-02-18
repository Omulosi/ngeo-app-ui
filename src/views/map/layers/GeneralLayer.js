import React from 'react';
import PropTypes from 'prop-types';
import { GeoJSON } from 'react-leaflet';

const GeneralLayer = React.forwardRef(({ data, styles }, ref) => {
  return <GeoJSON data={data} style={styles} ref={ref} />;
});

GeneralLayer.propTypes = {
  data: PropTypes.object,
  /**
   * A function that defines path options for
   * styling GeoJSON lines.
   * Called internally when data is added.
   *
   * sampple options:
   *  - color
   *  - fillColor (== color)
   *
   * Takes a param called feature => the feature to display
   *
   * sample definition:
   *  const styles = () => {
   *  return { color: '#000', fillColor: '#ffe338' };
   *  };
   */
  styles: PropTypes.object
};

export default GeneralLayer;
