import React, { useRef, useEffect } from 'react';
/* eslint-disable */
import {
  Map as MapContainer,
  LayersControl,
  LayerGroup,
  TileLayer
} from 'react-leaflet';
import L from 'leaflet';
import { GeneralLayer, LocationMarkers } from './layers';
import baseMaps from './layers/baseMap';
import {
  EditControlComponent,
  MeasureControlComponent,
  SearchControl,
  PrintControl
} from './controls';
import { CoordinatesControl } from 'react-leaflet-coordinates';
import {
  useIsioloProjects,
  useIsioloInstallations,
  useJurisdiction
} from 'src/data';

import { greenIcon, blueIcon } from './icons';

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

  let printControl = null;
  const mapRef = useRef(null);
  const areaRef = useRef(null);

  const [count, setCount] = React.useState(0);

  function onClick() {
    setCount(count + 1);
  }

  const print = () => {
    printControl.printMap('A4Portrait', 'MyFileName');
  };

  const defaultGeoJsonData = {
    type: 'FeatureCollection',
    features: []
  };

  let {
    projects,
    loading: projectLoading,
    error: projectError
  } = useIsioloProjects();

  let {
    installations,
    loading: installationLoading,
    error: installationError
  } = useIsioloInstallations();
  const { area, loading, error } = useJurisdiction('ngare mara');

  const regionStyles = (feature) => {
    return {
      color: 'rgb(238, 153, 0)',
      fillColor: 'rgb(238, 153, 0)',
      opacity: '0.4'
    };
  };

  useEffect(() => {
    try {
      if (mapRef.current && areaRef.current) {
        mapRef.current.leafletElement.fitBounds(
          areaRef.current.leafletElement.getBounds()
        );
      }
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <MapContainer
      center={center}
      zoom={7}
      maxZoom={20}
      minZoom={5}
      className="map"
      ref={mapRef}
      onClick={onClick}
    >
      <LayersControl position="topright">
        {baseMaps.map(
          ({
            name,
            url,
            attribution,
            type,
            layer,
            format,
            checked = false
          }) => {
            return (
              <LayersControl.BaseLayer key={name} name={name} checked={checked}>
                <TileLayer attribution={attribution} url={url} />
              </LayersControl.BaseLayer>
            );
          }
        )}

        <LayersControl.Overlay checked name="Jurisdiction">
          <GeneralLayer data={area} styles={regionStyles} ref={areaRef} />
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

      <EditControlComponent />
      <MeasureControlComponent />
      <SearchControl />
      <PrintControl
        ref={(ref) => {
          printControl = ref;
        }}
        position="topleft"
        sizeModes={['Current', 'A4Portrait', 'A4Landscape']}
        hideControlContainer={false}
      />
      <PrintControl
        position="topleft"
        sizeModes={['Current', 'A4Portrait', 'A4Landscape']}
        hideControlContainer={false}
        title="Export as PNG"
        exportOnly
      />
      <CoordinatesControl coordinates="decimal" position="bottomleft" />
    </MapContainer>
  );
};

export default Map;
