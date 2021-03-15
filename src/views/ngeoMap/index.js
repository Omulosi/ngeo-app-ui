import React from 'react';
import { fromLonLat } from 'ol/proj';
import { makeStyles } from '@material-ui/core';
/* eslint-disable */
import MapProvider from './Map';
import NgeoMap from './NgeoMap';
import mainConfig from 'src/config/config.json';
import Header from './header/Header';

const useStyles = makeStyles({
  map: {
    height: '100vh'
  }
});

const Map = () => {
  const classes = useStyles();
  const { centerCoords, defaultZoom } = mainConfig;
  return (
    <div>
      <MapProvider
        center={fromLonLat(centerCoords)}
        zoom={defaultZoom}
        className={classes.map}
      >
        <NgeoMap />
      </MapProvider>
    </div>
  );
};

export default Map;
