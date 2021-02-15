// import React, { Component } from 'react';
// import { FeatureGroup } from 'react-leaflet';
// import { EditControl } from 'react-leaflet-draw';
// import L from 'leaflet';
// import { renderToString } from 'react-dom/server';

// var _ = require('lodash');

// export default class EditControlComponent extends Component {
//   // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc

//   _onEdited = (e) => {
//     let numEdited = 0;
//     e.layers.eachLayer((layer) => {
//       numEdited += 1;
//     });
//     console.log(`_onEdited: edited ${numEdited} layers`, e);

//     //this._onChange();
//   };

//   _onCreated = (e) => {
//     let type = e.layerType;
//     let layer = e.layer;
//     if (type === 'marker') {
//       // Do marker specific actions
//       console.log('_onCreated: marker created', e);
//     } else {
//       console.log('_onCreated: something else created:', type, e);
//     }

//     this._onChange();
//   };

//   _onDeleted = (e) => {
//     let numDeleted = 0;
//     e.layers.eachLayer((layer) => {
//       numDeleted += 1;
//     });
//     console.log(`onDeleted: removed ${numDeleted} layers`, e);

//     this._onChange();
//   };

//   _onMounted = (drawControl) => {
//     console.log('_onMounted', drawControl);
//   };

//   _onEditStart = (e) => {
//     console.log('_onEditStart', e);
//   };

//   _onEditStop = (e) => {
//     console.log('_onEditStop', e);
//   };

//   _onDeleteStart = (e) => {
//     console.log('_onDeleteStart', e);
//   };

//   _onDeleteStop = (e) => {
//     console.log('_onDeleteStop', e);
//   };

//   render() {
//     return (
//       <FeatureGroup
//         ref={(reactFGref) => {
//           this._onFeatureGroupReady(reactFGref);
//         }}
//       >
//         <EditControl
//           position="topright"
//           onEdited={this._onEdited}
//           onCreated={this._onCreated}
//           onDeleted={this._onDeleted}
//           onMounted={this._onMounted}
//           onEditStart={this._onEditStart}
//           onEditStop={this._onEditStop}
//           onDeleteStart={this._onDeleteStart}
//           onDeleteStop={this._onDeleteStop}
//           draw={{
//             rectangle: false,
//             polygon: false,
//             circle: false,
//             polyline: false,
//             circlemarker: false
//           }}
//         />
//       </FeatureGroup>
//     );
//   }

//   _editableFG = null;

//   defaultData = {
//     type: 'FeatureCollection',
//     features: []
//   };

//   _onFeatureGroupReady = (reactFGref) => {
//     let { data } = this.props;

//     // populate the leaflet FeatureGroup with the geoJson layers

//     if (_.isEmpty(data)) {
//       data = this.defaultData;
//     }

//     let leafletGeoJSON = new L.GeoJSON(data);

//     try {
//       let leafletFG = reactFGref.leafletElement;

//       leafletGeoJSON.eachLayer((layer) => {
//         leafletFG.addLayer(layer);
//       });
//     } catch (err) {
//       console.log(err);
//     }

//     // store the ref for future access to content

//     this._editableFG = reactFGref;
//   };

//   _onChange = () => {
//     // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API

//     const { onChange } = this.props; // function to handle any changes to a geometry

//     // Do nothing if there's nothing to change or a function to handle a change is not specified
//     if (!this._editableFG || !onChange) {
//       return;
//     }

//     // Get geojson representation of leaflet elemet
//     const geojsonData = this._editableFG.leafletElement.toGeoJSON();
//     // Handle the change: save to db etc...
//     onChange(geojsonData);
//   };
// }
