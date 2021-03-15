/* eslint-disable */
import {
  Circle as CircleStyle,
  Square,
  Fill,
  Stroke,
  Style,
  Icon,
  RegularShape
} from 'ol/style';

const styles = {
  Dot: new Style({
    image: new Icon(
      /** @type {olx.style.IconOptions} */ ({
        color: '#8959A8',
        crossOrigin: 'anonymous',
        src: 'https://openlayers.org/en/v4.6.4/examples/data/dot.png'
      })
    )
  }),
  Point: new Style({
    image: new RegularShape({
      points: 4,
      radius: 8,
      angle: Math.PI / 4,
      fill: new Fill({ color: 'red' }),
      stroke: new Stroke({
        color: [0, 0, 0],
        width: 2
      })
    })
  }),
  // Point: new Style({
  //   image: new CircleStyle({
  //     radius: 1,
  //     fill: new Fill({
  //       color: 'magenta'
  //     }),
  //     stroke: new Stroke({
  //       color: 'magenta'
  //     })
  //   })
  // }),
  Polygon: new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  })
};

export default styles;
