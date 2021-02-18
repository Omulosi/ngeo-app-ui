import React from 'react';
import ReactLeafletSearch from 'react-leaflet-search';

const SearchControl = () => (
  <ReactLeafletSearch position="topleft" providerOptions={{ region: 'ke' }} />
);

export default SearchControl;
