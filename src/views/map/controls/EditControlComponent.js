import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
// import { renderToString } from 'react-dom/server';

const _ = require('lodash');

class EditControlComponent extends Component {
  // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc

  defaultData = {
    type: 'FeatureCollection',
    features: []
  };

  _editableFG = null;

  _onFeatureGroupReady = (reactFGref) => {
    // eslint-disable-next-line react/prop-types
    let { data } = this.props;

    // populate the leaflet FeatureGroup with the geoJson layers

    if (_.isEmpty(data)) {
      data = this.defaultData;
    }

    const leafletGeoJSON = new L.GeoJSON(data);

    try {
      const leafletFG = reactFGref.leafletElement;

      leafletGeoJSON.eachLayer((layer) => {
        leafletFG.addLayer(layer);
      });
    } catch (err) {
      console.log(err);
    }

    // store the ref for future access to content

    this._editableFG = reactFGref;
  };

  _onChange = () => {
    // this._editableFG contains the edited geometry,
    // which can be manipulated through the leaflet API

    // eslint-disable-next-line react/prop-types
    const { onChange } = this.props; // function to handle any changes to a geometry

    // Do nothing if there's nothing to change or a function to handle a change is not specified
    if (!this._editableFG || !onChange) {
      return;
    }

    // Get geojson representation of leaflet elemet
    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    // Handle the change: save to db etc...
    onChange(geojsonData);
  };

  //   _onEdited = (e) => {
  //     let numEdited = 0;
  //     e.layers.eachLayer((layer) => {
  //       numEdited += 1;
  //     });
  //     console.log(`_onEdited: edited ${numEdited} layers`, e);

  //     //this._onChange();
  //   };

  _onCreated = (e) => {
    const type = e.layerType;
    // let layer = e.layer;
    if (type === 'marker') {
      // Do marker specific actions
      console.log('_onCreated: marker created', e);
    } else {
      console.log('_onCreated: something else created:', type, e);
    }

    this._onChange();
  };

  //   _onDeleted = (e) => {
  //     let numDeleted = 0;
  //     e.layers.eachLayer((layer) => {
  //       numDeleted += 1;
  //     });
  //     console.log(`onDeleted: removed ${numDeleted} layers`, e);

  //     this._onChange();
  //   };

  _onMounted = (drawControl) => {
    console.log('_onMounted', drawControl);
  };

  _onEditStart = (e) => {
    console.log('_onEditStart', e);
  };

  _onEditStop = (e) => {
    console.log('_onEditStop', e);
  };

  _onDeleteStart = (e) => {
    console.log('_onDeleteStart', e);
  };

  _onDeleteStop = (e) => {
    console.log('_onDeleteStop', e);
  };

  render() {
    return (
      <FeatureGroup
        ref={(reactFGref) => {
          this._onFeatureGroupReady(reactFGref);
        }}
      >
        <EditControl
          position="topright"
          onEdited={this._onEdited}
          onCreated={this._onCreated}
          draw={{
            rectangle: false,
            polygon: false,
            circle: false,
            polyline: false,
            circlemarker: false
          }}
        />
      </FeatureGroup>
    );
  }
}

EditControl.propTypes = {
  data: PropTypes.any
};

export default EditControlComponent;
