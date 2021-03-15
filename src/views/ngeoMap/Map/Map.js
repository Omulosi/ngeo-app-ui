import React, { useRef, useState, useEffect } from 'react';
import * as ol from 'ol';
/* eslint-disable */
import Popup from 'src/utils/helpers/Popup';
import MapContext from './MapContext';
import './Map.css';
import OLOverrides from './OLOverrides.css';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const Map = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  // on component mount
  useEffect(() => {
    let source = new OSM();
    const options = {
      view: new ol.View({
        zoom,
        center,
        maxZoom: 18,
        resolutions: source.getTileGrid().getResolutions()
      }),
      layers: [
        new TileLayer({
          source
        })
      ],
      controls: [],
      overlays: []
    };

    const mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    window.map = mapObject;
    window.popup = new Popup();
    window.map.addOverlay(window.popup);

    window.map.once('rendercomplete', (e) => {
      window.emitter.emit('mapLoaded');
    });

    return () => {
      mapObject.setTarget(undefined);
    };
  }, []);

  // zoom change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setCenter(center);
  }, [center]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
