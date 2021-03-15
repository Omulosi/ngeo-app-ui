import { Vector as VectorSource } from 'ol/source';
import { GeoJSON } from 'ol/format';

// Vector source provides a source of features for vector layers
const vectorFeatures = ({ features }) => {
  return new VectorSource({
    features
  });
};

export const vectorGeoJson = ({ url }) => {
  return new VectorSource({
    format: new GeoJSON(),
    url
  });
};

export default vectorFeatures;
