import React, { useState } from 'react';
// import { fromLonLat } from 'ol/proj';
/* eslint-disable */
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  List,
  Divider
} from '@material-ui/core';
import createGetFeatureQuery, {
  createFilterFeatureQuery
} from 'src/utils/queries';
import getArea from 'src/utils/getArea';
import useFieldOfficer from 'src/hooks/field_officers';
import useCountyManager from 'src/hooks/county_managers';
import useUser from 'src/hooks/user';
import { roles } from 'src/config';
import { Layers, TileLayer, VectorLayer } from './Layers';
import { osm, vectorGeoJson } from './Source';
import { Controls, FullScreenControl, ScaleLineControl } from './Controls';
import SideDrawer from './SideDrawer';
import Navigation from './Controls/navigation/Navigation';
// import Map from './Map';
import MapContext from './Map/MapContext';
import styles from './geoStyles';
import Header from './header/Header';
import * as helpers from 'src/utils/helpers';
import FooterTools from './Footer/FooterTools';

const useStyles = makeStyles({
  map: {
    height: '100vh',
    position: 'relative'
  },
  container: {
    position: 'relative'
  }
});

const NgeoMap = () => {
  const classes = useStyles();
  // const { map } = useContext(MapContext);

  const [showCounties, setShowCounties] = useState(false);
  const [showRegions, setShowRegions] = useState(false);
  const [showUserArea, setShowUserArea] = useState(true);
  const [showUserProjects, setShowUserProjects] = useState(false);
  const [showAreaInstallations, setShowAreaInstallations] = useState(false);
  const [showTowns, setShowTowns] = useState(false);
  const [showConstituencies, setShowConstituencies] = useState(false);
  const [showSubcounties, setShowSubcounties] = useState(false);
  const [showPowerStations, setShowPowerStations] = useState(false);
  const [showProtected, setShowProtected] = useState(false);
  //
  const [showHealthCentres, setShowHealthCentres] = useState(false);
  const controls = [<ScaleLineControl />, <FullScreenControl />];

  const {
    data: user,
    isError: userError,
    isLoading: userLoading,
    isSuccess: userSuccess
  } = useUser();

  // const isAuthenticated = user && user.isAuthenticated;
  const isAuthenticated = !userLoading && !userError && user.isAuthenticated;

  const {
    data: fieldOfficer,
    isLoading: loadingFOO,
    error: fooError,
    isSuccess: fooSuccess
  } = useFieldOfficer();

  const {
    data: countyManager,
    isLoading: loadingCM,
    error: cmError,
    isSuccess: cmSuccess
  } = useCountyManager();

  // let fooAreasFilterString = '';
  // if (countyManagerSuccess) {
  //   fooAreasFilterString = getFieldOfficerAreas(countyManager);
  // }

  // get FOOs or CMs area
  const areas = getArea({
    user: { role: (user && user.attributes.role) || null },
    roles,
    countyManager,
    fieldOfficer
  });

  let regionName = '';
  let countyName = '';
  let subcountyName = '';
  let districtName = '';
  let divisionName = '';
  let locationName = '';
  let sublocationName = '';

  if (areas) {
    areas.forEach((area) => {
      if (area.type === 'Region') {
        regionName = area.name.toLocaleLowerCase();
      }
      if (area.type === 'County') {
        countyName = area.name.toLocaleLowerCase();
      }
      // Nuild search string for the rest
      if (area.type === 'Sub-County') {
        // subname
        subcountyName = area.name.toLocaleLowerCase();
      }
      if (area.type === 'District') {
        // distname
        districtName = area.name.toLocaleLowerCase();
      }
      if (area.type === 'Division') {
        // divname
        divisionName = area.name.toLocaleLowerCase();
      }
      if (area.type === 'Location') {
        // locname
        locationName = area.name.toLocaleLowerCase();
      }
      if (area.type === 'Sub-Location') {
        // sub_name
        sublocationName = area.name.toLocaleLowerCase();
      }
    });
  }

  const regionsURL = createGetFeatureQuery('ke_regions');
  const countiesURL = createGetFeatureQuery('ke_counties');
  const townsURL = createGetFeatureQuery('ke_major_towns');
  const constituenciesURL = createGetFeatureQuery('kenya_constituencies');
  const subCountiesURL = createGetFeatureQuery('ke_subcounties');
  let powerStationsURL = createGetFeatureQuery('ke_power_stations');
  let healthURL = createGetFeatureQuery('ke_health');
  const protectedURL = createGetFeatureQuery('ke_protected');
  let projectsURL = '';
  let userAreaURL = '';

  if (userSuccess) {
    if (user.attributes.role === roles.RM) {
      userAreaURL = createFilterFeatureQuery(
        'ke_regions',
        `strToLowerCase(region) like '${regionName}'`
      );
      // Make project have an area
      // projectsURL = createGetFeatureQuery('ke_counties');
    }
    healthURL = createFilterFeatureQuery(
      'ke_health',
      `strToLowerCase(PROV) like '${countyName}'`
    );

    if (user.attributes.role === roles.CM) {
      userAreaURL = createFilterFeatureQuery(
        'ke_counties',
        `strToLowerCase(counties) like '${countyName}'`
      );
      healthURL = createFilterFeatureQuery(
        'ke_health',
        `strToLowerCase(DIST) like '${countyName}'`
      );
      powerStationsURL = createFilterFeatureQuery(
        'ke_power_stations',
        `strToLowerCase(County2) like '${countyName}'`
      );
    }
    if (user.attributes.role === roles.FOO) {
      // create separate filter for each layer
      if (subcountyName) {
        userAreaURL = createFilterFeatureQuery(
          'ke_subcounties',
          `strToLowerCase() like '${subcountyName}'`
        );
        healthURL = createFilterFeatureQuery(
          'ke_health',
          `strToLowerCase(DIVISION) like '${subcountyName}'`
        );
      }
      if (locationName) {
        userAreaURL = createFilterFeatureQuery(
          'ke_sublocations',
          `strToLowerCase(locname) like '${locationName}'`
        );
        healthURL = createFilterFeatureQuery(
          'ke_health',
          `strToLowerCase(LOCATION) like '${locationName}'`
        );
        powerStationsURL = createFilterFeatureQuery(
          'ke_power_stations',
          `strToLowerCase(Location6) like '${locationName}'`
        );
      }
      if (sublocationName) {
        userAreaURL = createFilterFeatureQuery(
          'ke_sublocations',
          `strToLowerCase(sub_name) like '${sublocationName}'`
        );
        healthURL = createFilterFeatureQuery(
          'ke_health',
          ` strToLowerCase(SUB_LOCATI) like '${sublocationName}'`
        );
        powerStationsURL = createFilterFeatureQuery(
          'ke_power_stations',
          `strToLowerCase(Sub_Loca7) like '${sublocationName}'`
        );
      }
    }
  }

  if (fooSuccess) {
    projectsURL = createFilterFeatureQuery(
      'user_projects',
      `field_officer_id=${fieldOfficer.id}`
    );
  }

  if (cmSuccess) {
    projectsURL = createFilterFeatureQuery(
      'user_projects',
      `county_manager_id=${countyManager.id}`
    );
  }

  window.emitter.addListener('mapLoaded', () => {
    window.map.on('singleclick', (evt) => {
      // this.getLayerList((groups)=>{
      //   const viewResolution = window.map.getView().getResolution();
      //   groups.forEach((layers) => {
      //     layers.forEach((layer) => {
      //       if (layer.visible && layer.liveLayer) {
      //         var url = layer.layer.getSource().getFeatureInfoUrl(evt.coordinate, viewResolution, "EPSG:3857", { INFO_FORMAT: "application/json" });
      //         if (url) {
      //           helpers.getJSON(url, (result) => {
      //             const features = result.features;
      //             if (features.length > 0) {
      //               const geoJSON = new GeoJSON().readFeatures(result);
      //               const feature = geoJSON[0];
      //               helpers.showFeaturePopup(evt.coordinate, feature);
      //             }
      //           });
      //         }
      //       }
      //     });
      //   });
      // });
      const features = evt.map.getFeaturesAtPixel(evt.pixel);
      features.forEach((feature) => {
        if (feature) {
          helpers.showFeaturePopup(evt.coordinate, feature);
        }
      });
    });
  });

  return (
    <div className={classes.container} id="map-theme">
      <Navigation />
      <FooterTools />
      <Layers>
        {showCounties && (
          <VectorLayer
            source={vectorGeoJson({
              url: countiesURL
            })}
            style={styles.MultiPolygon}
          />
        )}
        {showRegions && (
          <VectorLayer
            source={vectorGeoJson({
              url: regionsURL
            })}
            style={styles.MultiPolygon}
          />
        )}
        {showSubcounties && (
          <VectorLayer
            source={vectorGeoJson({
              url: subCountiesURL
            })}
            style={styles.MultiPolygon}
          />
        )}
        {showUserArea && (
          <VectorLayer
            source={vectorGeoJson({
              url: userAreaURL
            })}
            style={styles.MultiPolygon}
            type="area"
          />
        )}
        {showUserProjects && (
          <VectorLayer
            source={vectorGeoJson({
              url: projectsURL
            })}
            style={styles.Point}
          />
        )}
        {showTowns && (
          <VectorLayer
            source={vectorGeoJson({
              url: townsURL
            })}
            style={styles.Point}
          />
        )}
        {showPowerStations && (
          <VectorLayer
            source={vectorGeoJson({
              url: powerStationsURL
            })}
            style={styles.Point}
          />
        )}
        {showHealthCentres && (
          <VectorLayer
            source={vectorGeoJson({
              url: healthURL
            })}
            style={styles.Point}
          />
        )}
        {showProtected && (
          <VectorLayer
            source={vectorGeoJson({
              url: protectedURL
            })}
            style={styles.MultiPolygon}
          />
        )}
      </Layers>
      <Controls>{controls}</Controls>

      <SideDrawer>
        <List>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText secondary="All Layers" />
          </ListItem>
          {/* Title */}
          <Divider />
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText secondary="Admin Boundaries" />
          </ListItem>
          <Divider />
          {/* Demarcation */}
          <ListItem button>
            <ListItemIcon>
              <input
                type="checkbox"
                checked={showRegions}
                onChange={(event) => setShowRegions(event.target.checked)}
              />
            </ListItemIcon>
            <ListItemText primary="Regions" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <input
                type="checkbox"
                checked={showCounties}
                onChange={(event) => setShowCounties(event.target.checked)}
              />
            </ListItemIcon>
            <ListItemText primary="Counties" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <input
                type="checkbox"
                checked={showSubcounties}
                onChange={(event) => setShowSubcounties(event.target.checked)}
              />
            </ListItemIcon>
            <ListItemText primary="Sub-Counties" />
          </ListItem>
          {/* Demacartion */}
          <Divider />
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText secondary="Installations" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <input
                type="checkbox"
                checked={showTowns}
                onChange={(event) => setShowTowns(event.target.checked)}
              />
            </ListItemIcon>
            <ListItemText primary="Major Towns" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <input
                type="checkbox"
                checked={showPowerStations}
                onChange={(event) => setShowPowerStations(event.target.checked)}
              />
            </ListItemIcon>
            <ListItemText primary="Power Stations" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <input
                type="checkbox"
                checked={showHealthCentres}
                onChange={(event) => setShowHealthCentres(event.target.checked)}
              />
            </ListItemIcon>
            <ListItemText primary="Health Centres" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <input
                type="checkbox"
                checked={showProtected}
                onChange={(event) => setShowProtected(event.target.checked)}
              />
            </ListItemIcon>
            <ListItemText primary="Protected Areas" />
          </ListItem>
          {/* Demacartion */}
          <Divider />
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText secondary="User Data" />
          </ListItem>
          <Divider />

          {isAuthenticated && (
            <>
              <ListItem button>
                <ListItemIcon>
                  <input
                    type="checkbox"
                    checked={showUserArea}
                    onChange={(event) => setShowUserArea(event.target.checked)}
                  />
                </ListItemIcon>
                <ListItemText primary="Jurisdiction" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <input
                    type="checkbox"
                    checked={showUserProjects}
                    onChange={(event) =>
                      setShowUserProjects(event.target.checked)
                    }
                  />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItem>
            </>
          )}
        </List>
      </SideDrawer>
    </div>
  );
};

export default NgeoMap;
