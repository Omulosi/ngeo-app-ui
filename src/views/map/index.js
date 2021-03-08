import React from 'react';
import Iframe from 'react-iframe';

const MapIframe = () => {
  return (
    <Iframe
      url="http://localhost:3001/public"
      width="100%"
      height="99.8%"
      id="myId"
      className="myClassname"
      display="initial"
      position="relative"
    />
  );
};

export default MapIframe;
