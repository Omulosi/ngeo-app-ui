import { withLeaflet } from 'react-leaflet';
import PrintControlDefault from 'react-leaflet-easyprint';

// wrap `PrintControl` component with `withLeaflet` HOC
const PrintControl = withLeaflet(PrintControlDefault);

export default PrintControl;
