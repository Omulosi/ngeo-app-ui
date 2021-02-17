import React, { useState, useEffect, useCallback } from 'react';
/* eslint-disable */
import {
  MapContainer,
  LayersControl,
  LayerGroup,
  TileLayer
} from 'react-leaflet';
import L from 'leaflet';
import {
  OSMTileLayer,
  GeneralLayer,
  LocationMarkers
  // RegionLayer
} from './layers';

import { greenIcon, blueIcon } from './icons';

import kenya_counties from 'src/dummy_data/counties';
import ngare_mara from 'src/dummy_data/ngare_mara';
import isiolo_projects from 'src/dummy_data/isiolo_projects';
import foo_projects from 'src/dummy_data/projects';
// import isiolo_installations from 'src/dummy_data/isiolo_key_installations';
import foo_installations from 'src/dummy_data/installations';

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = () => {
  const center = [0.69960492000038, 37.9210640870001];

  const defaultGeoJsonData = {
    type: 'FeatureCollection',
    features: []
  };

  // const [counties, setCounties] = useState(defaultGeoJsonData);
  const [area, setArea] = useState(defaultGeoJsonData);
  const [projects, setProjects] = useState(defaultGeoJsonData);
  const [installations, setInstallations] = useState(defaultGeoJsonData);
  // const [markers, setMarkers] = useState(defaultGeoJsonData);

  // const fetchCounties = useCallback(() => {
  //   setCounties(kenya_counties);
  // }, []);

  const fetchArea = useCallback(() => {
    setArea(ngare_mara);
  }, []);

  const fetchProjects = useCallback(() => {
    setProjects(foo_projects);
  }, []);

  const fetchInstallations = useCallback(() => {
    // setInstallations(isiolo_installations);
    setInstallations(foo_installations);
  }, []);

  // const fetchMarkers = useCallback(() => {
  //   // setMarkers(sample_markers);
  //   setMarkers(foo_projects);
  // }, []);

  useEffect(() => {
    fetchArea();
    fetchProjects();
    fetchInstallations();
  }, [fetchArea, fetchProjects, fetchInstallations]);

  const regionStyles = () => {
    return { color: '#000', fillColor: '#ffe338' };
  };

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <OSMTileLayer />,
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="Jurisdiction">
          <GeneralLayer data={area} styles={regionStyles} />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Projects">
          <LayerGroup>
            {projects ? (
              <LocationMarkers markers={projects} icon={greenIcon} />
            ) : null}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Installations">
          <LayerGroup>
            {installations ? (
              <LocationMarkers markers={installations} icon={blueIcon} />
            ) : null}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
