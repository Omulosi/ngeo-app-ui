import React, { useRef, useState, useEffect } from 'react';
import {
  Map as MapContainer,
  LayersControl,
  LayerGroup,
  TileLayer
} from 'react-leaflet';
import L from 'leaflet';
import { CoordinatesControl } from 'react-leaflet-coordinates';
import { roles } from 'src/config';
import debounce from 'src/utils/debounce';
import getArea, { getProjects, getInstallations } from 'src/utils/getArea';
import useFieldOfficer from 'src/hooks/field_officers';
import useCountyManager from 'src/hooks/county_managers';
import useUser from 'src/hooks/user';
import { useRegion, useRegions } from 'src/hooks/regions';
import { useCounty, useCounties } from 'src/hooks/counties';
import { useSublocation } from 'src/hooks/sub_locations';
import getFieldOfficerAreas from 'src/utils/getFieldOfficerAreas';
import { GeneralLayer, LocationMarkers } from './layers';
import baseMaps from './layers/baseMap';
import {
  EditControlComponent,
  MeasureControlComponent,
  SearchControl,
  PrintControl
} from './controls';
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

const jurisdictionStyles = () => {
  return {
    color: 'rgb(238, 153, 0)',
    fillColor: 'rgb(238, 153, 0)',
    opacity: '0.4'
  };
};

const defaultGeoJsonData = {
  type: 'FeatureCollection',
  features: []
};

/* eslint-disable */
const Map = () => {
  let printControl = null;
  const mapRef = useRef(null);
  const areaRef = useRef(null);
  const center = [0.69960492000038, 37.9210640870001];

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

  const print = () => {
    printControl.printMap('A4Portrait', 'MyFileName');
  };

  const { data: user, error: userError, isSuccess: userSuccess } = useUser();
  const {
    data: fieldOfficer,
    isLoading: loadingFOO,
    error: fooError
  } = useFieldOfficer();
  const {
    data: countyManager,
    isLoading: loadingCM,
    error: cmError,
    isSuccess: countyManagerSuccess
  } = useCountyManager();

  let fooAreasFilterString = '';
  if (countyManagerSuccess) {
    fooAreasFilterString = getFieldOfficerAreas(countyManager);
  }

  const isAuthenticated = user && user.isAuthenticated;

  // get FOOs or CMs area
  const areas = getArea({
    user: { role: (user && user.attributes.role) || null },
    roles,
    countyManager,
    fieldOfficer
  });

  let projects;
  let installations;

  if (userSuccess) {
    if (user.attributes.role === roles.FOO) {
      projects = getProjects({ data: fieldOfficer });
    }

    if (user.attributes.role === roles.CM) {
      projects = getProjects({ data: countyManager });
    }

    if (user.attributes.role === roles.FOO) {
      installations = getInstallations({ data: fieldOfficer });
    }

    if (user.attributes.role === roles.CM) {
      installations = getInstallations({ data: countyManager });
    }
  }

  let regionName = '';
  let countyName = '';
  let filterString = '';
  if (areas) {
    areas.forEach((area) => {
      if (area.type === 'Region') {
        regionName = area.name;
      }
      if (area.type === 'County') {
        countyName = area.name;
      }
      // Nuild search string for the rest
      if (area.type === 'Sub-County') {
        // searchString += `subname=${area.name}&`
      }
      if (area.type === 'District') {
        filterString += `distname=${area.name}&`;
      }
      if (area.type === 'Division') {
        filterString += `divname=${area.name}&`;
      }
      if (area.type === 'Location') {
        filterString += `locname=${area.name}&`;
      }
      if (area.type === 'Sub-Location') {
        filterString += `sub_name=${area.name}&`;
      }
    });
  }

  const {
    data: region,
    isLoading: regionLoading,
    error: regionError,
    isSuccess: regionSuccess
  } = useRegion(regionName);

  const {
    data: county,
    isLoading: countyLoading,
    error: countyError,
    isSuccess: countySuccess
  } = useCounty(countyName);

  const {
    data: fooArea,
    isLoading: fooAreaLoading,
    error: fooAreaError,
    isSuccess: fooSuccess
  } = useSublocation(filterString);

  const {
    data: fooAreas,
    isLoading: fooAreasLoading,
    error: fooAreasError,
    isSuccess: fooAreasSuccess
  } = useSublocation(`filters=${fooAreasFilterString}`);

  let data = defaultGeoJsonData;
  let fieldOfficerAreas = null;

  if (regionSuccess && userSuccess && user.attributes.role === roles.RM) {
    data = region.results;
  }

  if (countySuccess && userSuccess && user.attributes.role === roles.CM) {
    data = county.results;
  }

  if (fooSuccess && user && user.attributes.role === roles.FOO) {
    data = fooArea.results;
  }

  if (fooAreasSuccess) {
    fieldOfficerAreas = fooAreas.results;
  }

  let counties = defaultGeoJsonData;
  let regions = defaultGeoJsonData;
  // All regions
  const {
    data: regionsResponse,
    isLoading: loadRegions,
    error: regionsError,
    isSuccess: regionsSuccess
  } = useRegions();

  if (regionsSuccess) {
    regions = regionsResponse.results;
  }

  // All counties
  const {
    data: countiesResponse,
    isLoading: loadCounties,
    error: countiesError,
    isSuccess: countiesSuccess
  } = useCounties();

  if (countiesSuccess) {
    counties = countiesResponse.results;
  }

  if (countiesError) {
    console.log(countiesError);
  }

  if (regionsError) {
    console.log(regionsError);
  }

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
        {isAuthenticated && (
          <LayersControl.Overlay checked name="Jurisdiction">
            <GeneralLayer
              ref={areaRef}
              styles={jurisdictionStyles}
              data={data}
            />
          </LayersControl.Overlay>
        )}

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

        {fieldOfficerAreas && (
          <LayersControl.Overlay name="My FOO Areas">
            <GeneralLayer data={fieldOfficerAreas} />
          </LayersControl.Overlay>
        )}

        <LayersControl.Overlay name="Regions">
          <GeneralLayer data={regions} />,
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Counties">
          <GeneralLayer data={counties} />,
        </LayersControl.Overlay>

        {isAuthenticated && (
          <LayersControl.Overlay name="Projects">
            <LayerGroup>
              {projects ? (
                <LocationMarkers markers={projects} icon={greenIcon} />
              ) : null}
            </LayerGroup>
          </LayersControl.Overlay>
        )}

        {isAuthenticated && (
          <LayersControl.Overlay name="Installations">
            <LayerGroup>
              {installations ? (
                <LocationMarkers markers={installations} icon={blueIcon} />
              ) : null}
            </LayerGroup>
          </LayersControl.Overlay>
        )}
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
