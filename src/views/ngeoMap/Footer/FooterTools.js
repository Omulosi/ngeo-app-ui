/* jshint loopfunc:true */
import React, { Component } from 'react';
import './FooterTools.css';
import * as helpers from 'src/utils/helpers';
import mainConfig from 'src/config/config.json';

/* eslint-disable */
const feedbackTemplate = (xmin, xmax, ymin, ymax, centerx, centery, scale) => {
  return `${mainConfig.feedbackUrl}/?xmin=${xmin}&xmax=${xmax}&ymin=${ymin}&ymax=${ymax}&centerx=${centerx}&centery=${centery}&scale=${scale}`;
};

class FooterTools extends Component {
  constructor(props) {
    super(props);
    // LISTEN FOR MAP TO MOUNT
    window.emitter.addListener('mapLoaded', () => this.onMapLoad());

    this.onMapLoad = this.onMapLoad.bind(this);
    this.state = {
      scale: '',
      basemapType: 'IMAGERY'
    };
    this.mapScales = [
      { label: '1:250', value: 250 },
      { label: '1:500', value: 500 },
      { label: '1:1,000', value: 1000 },
      { label: '1:2,000', value: 2000 },
      { label: '1:5,000', value: 5000 },
      { label: '1:10,000', value: 10000 },
      { label: '1:25,000', value: 25000 },
      { label: '1:50,000', value: 50000 }
    ];
    // LISTEN FOR MAP TO MOUNT
    window.emitter.addListener('basemapChanged', (type) => {
      this.setState({ basemapType: type });
    });
    // LISTEN FOR CONTROL VISIBILITY CHANGES
    window.emitter.addListener('mapControlsChanged', (control, visible) => {
      this.controlStateChange(control, visible);
    });
  }

  componentDidMount() {
    this.setState({ showScale: window.mapControls.scale });
  }

  onMapLoad() {
    window.map.on('moveend', () => {
      const scale = helpers.getMapScale();

      this.setState({
        scale: scale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        currentScale: scale
      });
    });
  }

  // onPrintClick = () => {
  //   helpers.showMessage('Print', 'Coming Soon');

  //   // APP STATS
  //   helpers.addAppStat('Print', 'Click (Footer)');
  // };

  // onLegendClick = () => {
  //   helpers.showMessage('Legend', 'Coming Soon');
  //   // APP STATS
  //   helpers.addAppStat('Legend', 'Click (Footer)');
  // };

  // onFeedbackClick = () => {
  //   // APP STATS
  //   helpers.addAppStat('Feedback', 'Click (Footer)');

  //   const scale = helpers.getMapScale();
  //   const extent = window.map.getView().calculateExtent(window.map.getSize());
  //   const xmin = extent[0];
  //   const xmax = extent[1];
  //   const ymin = extent[2];
  //   const ymax = extent[3];
  //   const center = window.map.getView().getCenter();

  //   const feedbackUrl = feedbackTemplate(
  //     xmin,
  //     xmax,
  //     ymin,
  //     ymax,
  //     center[0],
  //     center[1],
  //     scale
  //   );

  //   helpers.showURLWindow(feedbackUrl, false, 'full');
  // };

  // onTermsClick = () => {
  //   helpers.showURLWindow(mainConfig.termsUrl, false, 'full');
  //   // APP STATS
  //   helpers.addAppStat('Terms', 'Click (Footer)');
  // };

  onScaleClick = (value) => {
    helpers.setMapScale(value);
  };

  controlStateChange(control, state) {
    switch (control) {
      case 'scale':
        this.setState({ showScale: state });
        break;
      default:
        break;
    }
  }

  render() {
    setTimeout(() => {
      const col = document.getElementsByClassName('ol-scale-line-inner');
      if (col.length > 0) {
        const olScaleBar = col[0];
        const scScaleBar = document.getElementById('sc-scale-bar-text');
        scScaleBar.setAttribute('style', `width:  ${olScaleBar.style.width}`);
      }
    }, 10);

    const { basemapType, scale } = this.state;
    return (
      <div>
        <div
          id="sc-scale-bar-text"
          className={
            basemapType === 'IMAGERY'
              ? 'sc-map-footer-scale-only imagery'
              : 'sc-map-footer-scale-only topo'
          }
        >
          {`Scale: 1:${scale}`}
        </div>
      </div>
    );
  }
}

export default FooterTools;
