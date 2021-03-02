import React, { useState, useEffect, useCallback } from 'react';
/* eslint-disable */
import useUser, {
  useUserInstallations,
  useSublocations,
  useUserArea,
  useCounties,
  useRegions,
  useUserProjects
} from 'src/data';
import { roles } from 'src/config';
import { axiosWithAuth } from 'src/utils/axios';
import Map from './Map';

const defaultGeoJsonData = {
  type: 'FeatureCollection',
  features: []
};

const MapView = () => {
  const [region, setUserRegion] = useState(defaultGeoJsonData);
  const [county, setUserCounty] = useState(defaultGeoJsonData);
  const [sublocation, setUserSublocation] = useState(defaultGeoJsonData);

  // Get current user
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

  // get user's area
  const { data: areas, error: areaError } = useUserArea(userPk);

  if (areaError) {
    console.log(areaError);
  }

  const userAreas = {
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
    userAreas.region = regionName;
    countyName = areas[0].attributes.county;
    userAreas.county = countyName;
    subcountyName = areas[0].attributes.sub_county;
    userAreas.subcounty = subcountyName;
    locationName = areas[0].attributes.location;
    userAreas.location = locationName;
    sublocationName = areas[0].attributes.sub_location;
    userAreas.sublocation = sublocationName;
  }

  let jurisdictionArea = '';

  if (userRole === roles.RM && userAreas.region) {
    jurisdictionArea = userAreas.region;
  }

  if (userRole === roles.CM && userAreas.county) {
    jurisdictionArea = userAreas.county;
  }

  if (
    userRole === roles.FOO &&
    (userAreas.sublocation || userAreas.location || userAreas.subcounty)
  ) {
    jurisdictionArea =
      userAreas.sublocation || userAreas.location || userAreas.subcounty;
  }

  let data = {
    type: 'FeatureCollection',
    features: []
  };

  const fetchUserRegion = useCallback(() => {
    axiosWithAuth()
      .get(`/regions?search=${jurisdictionArea}`)
      .then(({ data }) => {
        const res = data ? data.data.results : defaultGeoJsonData;
        setUserRegion(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setUserRegion]);

  const fetchUserCounty = useCallback(() => {
    axiosWithAuth()
      .get(`/counties?counties=${jurisdictionArea}`)
      .then(({ data }) => {
        const res = data ? data.data.results : defaultGeoJsonData;
        setUserCounty(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setUserCounty]);

  const fetchUserSublocation = useCallback(() => {
    axiosWithAuth()
      .get(`/sublocations?sub_name=${jurisdictionArea}`)
      .then(({ data }) => {
        const res = data ? data.data.results : defaultGeoJsonData;
        setUserSublocation(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setUserSublocation]);

  useEffect(() => {
    fetchUserCounty();
    fetchUserRegion();
    fetchUserSublocation();
  }, [fetchUserCounty, fetchUserRegion, fetchUserSublocation]);

  //   const { data: regionsResp, mutate: mutateRegions } = useRegions(
  //     jurisdictionArea
  //   );

  //   const { data: countiesResp, mutate: mutateArea } = useCounties(
  //     jurisdictionArea
  //   );

  //   const { data: sublocationsResp, mutate: mutateSublocation } = useSublocations(
  //     jurisdictionArea
  //   );

  if (user && user.attributes.role === roles.RM) {
    // data = regionsResp;
    data = region;
  }

  if (user && user.attributes.role === roles.CM) {
    // data = countiesResp ? countiesResp.data.results : defaultGeoJsonData;
    data = county;
  }

  if (user && user.attributes.role === roles.FOO) {
    // data = sublocationsResp;
    data = sublocation;
  }
  // All regions
  const {
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

  counties = counties ? counties.data.results : defaultGeoJsonData;

  if (regionsError) {
    console.log(regionsError);
  }

  // user specific data
  const {
    data: projects,
    loading: projectLoading,
    error: projectError
  } = useUserProjects(userPk);

  // installations in users area
  const {
    installations,
    loading: installationLoading,
    error: installationError
  } = useUserInstallations(userPk);

  return (
    <Map
      area={data}
      counties={counties}
      regions={regions}
      projects={projects}
      installations={installations}
    />
  );
};

export default MapView;
