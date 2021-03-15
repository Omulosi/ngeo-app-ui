/* eslint-disable */
const BASE_FEATURE_URL =
  'http://localhost:8080/geoserver/ngeo/wfs?service=wfs&version=2.0.0&request=getfeature&';

const createGetFeatureQuery = (feature) => {
  return `${BASE_FEATURE_URL}typename=${feature}&outputFormat=json`;
};

export const createFilterFeatureQuery = (feature, filterString) => {
  return `${BASE_FEATURE_URL}typename=${feature}&outputFormat=json&cql_filter=${filterString}`;
};

export default createGetFeatureQuery;
