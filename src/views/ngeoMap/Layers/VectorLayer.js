import { useContext, useEffect } from 'react';
import OLVectorLayer from 'ol/layer/Vector';
import MapContext from '../Map/MapContext';

/* eslint-disable */
const VectorLayer = ({ source, style, zIndex = 0, type }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const vectorLayer = new OLVectorLayer({
      source,
      style
    });

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    if (type === 'area') {
      const vectorSource = vectorLayer.getSource();

      vectorSource.once('change', function (e) {
        if (vectorSource.getState() === 'ready') {
          const extent = vectorSource.getExtent();
          window.areaExtent = extent;
          map
            .getView()
            .fit(extent, {
              size: map.getSize(),
              maxZoom: 16
            });
          // if (layers[0].getSource().getFeatures().length > 0) {
          //   map.getView().fit(vectorSource.getExtent(), map.getSize());
          // }
        }
      });
    }

    /* eslint-disable */
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);

  return null;
};

export default VectorLayer;
