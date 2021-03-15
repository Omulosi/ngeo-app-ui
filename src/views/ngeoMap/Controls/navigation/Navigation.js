import React, { useState, useContext } from 'react';
import './styles.css';
import { fromLonLat } from 'ol/proj';
import mainConfig from 'src/config/config.json';
import * as helpers from 'src/utils/helpers';
import MapContext from '../../Map/MapContext';

/* eslint-disable */

const Navigation = () => {
  const [state, setState] = useState({
    showCurrentLocation: true,
    showZoomExtent: true
  });
  const { map } = useContext(MapContext);

  // ZOOM TO FULL EXTENT
  const zoomFullExtent = () => {
    const { centerCoords, defaultZoom } = mainConfig.centerCoords;
    // window.map.getView().animate({ center: centerCoords, zoom: defaultZoom });
    if (window.areaExtent) {
      map.getView().fit(window.areaExtent, map.getSize(), { duration: 1000 });
    }
  };

  // ZOOM TO CURRENT LOCATION
  const zoomToCurrentLocation = () => {
    const options = { timeout: 5000 };
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = fromLonLat([pos.coords.longitude, pos.coords.latitude]);
        helpers.flashPoint(coords);
      },
      (err) => {
        helpers.showMessage(
          'Location',
          `Getting your location failed: ${err.message}`
        );
      },
      options
    );

    // helpers.addAppStat('Current Location', 'Click');
  };

  const controlStateChange = (control, val) => {
    switch (control) {
      case 'fullExtent':
        setState({ ...state, showZoomExtent: val });
        break;
      case 'zoomToCurrentLocation':
        setState({ ...state, showCurrentLocation: val });
        break;
      default:
        break;
    }
  };

  // LISTEN FOR CONTROL VISIBILITY CHANGES
  window.emitter.addListener('mapControlsChanged', (control, visible) => {
    controlStateChange(control, visible);
  });

  return (
    <div>
      <div id="map-theme">
        <div className="nav-container">
          <div
            className="zoomButton"
            onClick={() => {
              // window.map.getView().setZoom(window.map.getView().getZoom() + 1);
              map.getView().setZoom(map.getView().getZoom() + 1);
            }}
          >
            +
          </div>
          <div
            className="zoomButton"
            onClick={() => {
              // window.map.getView().setZoom(window.map.getView().getZoom() - 1);
              map.getView().setZoom(map.getView().getZoom() - 1);
            }}
          >
            -
          </div>
          <div className="fullExtentButton" onClick={zoomFullExtent}>
            <div className="fullExtentContent" />
          </div>
          <div
            className="zoomToCurrentLocationButton"
            onClick={zoomToCurrentLocation}
          >
            <div className="zoomToCurrentLocationContent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
