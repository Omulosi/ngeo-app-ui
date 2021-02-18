import { createControlComponent } from '@react-leaflet/core';
import { Control } from 'leaflet';

const ScaleControl = createControlComponent(
  (props) => new Control.Scale(props)
);

export default ScaleControl;
