/* eslint-disable */
import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  Map as MapContainer,
  LayersControl,
  LayerGroup,
  TileLayer
} from 'react-leaflet';
import L from 'leaflet';
import { useSelector } from 'react-redux';

import { CoordinatesControl } from 'react-leaflet-coordinates';
import useUser, {
  useUserInstallations,
  useSublocations,
  useUserArea,
  useCounties,
  useCountiesWithoutAuth,
  useRegionsWithoutAuth,
  useRegions,
  useUserProjects
} from 'src/data';
import { roles } from 'src/config';
import { GeneralLayer, LocationMarkers } from './layers';
import baseMaps from './layers/baseMap';
import {
  EditControlComponent,
  MeasureControlComponent,
  SearchControl,
  PrintControl
} from './controls';
import { axiosWithAuth } from 'src/utils/axios';

import { greenIcon, blueIcon } from './icons';
import debounce from 'src/utils/debounce';

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

const regionStyles = () => {
  return {
    color: 'rgb(238, 153, 0)',
    fillColor: 'rgb(238, 153, 0)',
    opacity: '0.4'
  };
};

/* eslint-disable */
const Map = () => {
  const defaultGeoJsonData = {
    type: 'FeatureCollection',
    features: []
  };

  // const [county, setCounty] = useState(defaultGeoJsonData);
  // const [regions, setRegions] = useState(defaultGeoJsonData);
  const [jurisdiction, setJurisdiction] = useState(defaultGeoJsonData);
  // const [projects, setProjects] = useState(defaultGeoJsonData);
  // const [installations, setInstallations] = useState(defaultGeoJsonData);

  // Re-render on window resize hence fit map to whatever screen size
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }, 1000);

    window.addEventListener('resize', debouncedHandleResize);

    return (_) => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  });

  let printControl = null;
  const mapRef = useRef(null);
  const areaRef = useRef(null);

  const center = [0.69960492000038, 37.9210640870001];

  const fitToArea = () => {
    try {
      if (mapRef.current && areaRef.current) {
        mapRef.current.leafletElement.fitBounds(
          areaRef.current.leafletElement.getBounds()
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const print = () => {
    printControl.printMap('A4Portrait', 'MyFileName');
  };

  //
  const { data: user, error: userError } = useUser();

  if (userError) {
    console.log(userError);
  }

  let userPk = null;
  let userRole = null;
  if (user) {
    userPk = user.attributes.pk;
    userRole = user.attributes.role;
  }

  const { data: areas, error: areaError } = useUserArea(userPk);

  if (areaError) {
    console.log(areaError);
  }

  let userAreas = {
    region: '',
    county: '',
    subcounty: '',
    location: '',
    sublocation: ''
  };
  let regionName = '';
  let countyName = '';
  let subcountyName = '';
  let locationName = '';
  let sublocationName = '';
  if (areas && areas.length > 0) {
    regionName = areas[0].attributes.region;
    userAreas['region'] = regionName;
    countyName = areas[0].attributes.county;
    userAreas['county'] = countyName;
    subcountyName = areas[0].attributes.sub_county;
    userAreas['subcounty'] = subcountyName;
    locationName = areas[0].attributes.location;
    userAreas['location'] = locationName;
    sublocationName = areas[0].attributes.sub_location;
    userAreas['sublocation'] = sublocationName;
  }

  let jurisdictionArea = '';
  let areaMap = defaultGeoJsonData;

  if (userRole == roles.RM) {
    jurisdictionArea = userAreas.region;
    let { data, loading, error } = useRegions(jurisdictionArea);
    areaMap = data;
    // setJurisdiction(areaMap);
  }

  if (userRole == roles.CM) {
    jurisdictionArea = userAreas.county;
    let { data, loading, error } = useCounties(jurisdictionArea);
    areaMap = data;
    // setJurisdiction(areaMap);
  }

  if (userRole == roles.FOO) {
    jurisdictionArea =
      userAreas.sublocation || userAreas.location || userAreas.subcounty;
    let { data, loading, error } = useSublocations(jurisdictionArea);
    areaMap = data;
    // setJurisdiction(areaMap);
  }

  // All regions
  let {
    data: regions,
    loading: loadRegions,
    error: regionsError
  } = useRegions();

  // All counties
  let {
    data: counties,
    loading: loadCounties,
    error: countiesError
  } = useCounties();

  if (countiesError) {
    console.log(countiesError);
  }

  if (regionsError) {
    console.log(regionsError);
  }

  // user specific data
  let {
    data: projects,
    loading: projectLoading,
    error: projectError
  } = useUserProjects(userPk);

  // installations in users area
  let {
    installations,
    loading: installationLoading,
    error: installationError
  } = useUserInstallations(userPk);

  return (
    <MapContainer
      center={center}
      zoom={7}
      maxZoom={20}
      minZoom={5}
      className="map"
      ref={mapRef}
      onlayeradd={fitToArea}
    >
      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Jurisdiction">
          <GeneralLayer ref={areaRef} styles={regionStyles} data={areaMap} />
        </LayersControl.Overlay>
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

        <LayersControl.Overlay name="Regions">
          <GeneralLayer data={regions} />,
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Counties">
          <GeneralLayer data={counties} />,
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
      {!isAuthenticated && (
        <PrintControl
          ref={(ref) => {
            printControl = ref;
          }}
          position="topleft"
          sizeModes={['Current', 'A4Portrait', 'A4Landscape']}
          hideControlContainer={false}
        />
      )}

      {!isAuthenticated && (
        <PrintControl
          position="topleft"
          sizeModes={['Current', 'A4Portrait', 'A4Landscape']}
          hideControlContainer={false}
          title="Export as PNG"
          exportOnly
        />
      )}

      <CoordinatesControl coordinates="decimal" position="bottomleft" />
    </MapContainer>
  );
};

export default Map;
