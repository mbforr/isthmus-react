import React, { Component } from 'react';
import { render } from 'react-dom';
import L from 'leaflet';
import carto from '@carto/carto.js';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { storeLayers, setMap, setBboxFilter } from './actions';
import { Widgets, Legend, AirbnbPopup, MobileTabs } from './components';
import layers from './layers';
import C from '../data/C'
import './index.css';

const { BASEMAP, BASEMAP_LABELS, CENTER, ZOOM } = C;

class CARTOMapNew extends Component {
  componentDidMount() {
    const map = L.map('map', { zoomControl: false, maxZoom: 18 }).setView(CENTER, ZOOM);

    L.tileLayer(BASEMAP).addTo(map);
    // L.control.zoom({ position: 'bottomleft' }).addTo(map);

    // this.popup = L.popup({ closeButton: false });

    this.setBbbox(map.getBounds());

    map.on('moveend', event => {
      const boundingBox = event.target.getBounds();
      this.setBbbox(boundingBox);
    });

    this.props.setMap(map);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.map && this.props.map) {
      this.setupLayers();
    }
  }

  setBbbox(bbox) {
    this.props.setBboxFilter([
      bbox.getSouthWest().lng,
      bbox.getSouthWest().lat,
      bbox.getNorthEast().lng,
      bbox.getNorthEast().lat,
    ]);
  }

  setupLayers() {
    const cartoLayers = Object.keys(layers).reduce((all, layerName) => {
      const { options, ...other} = layers[layerName];

      const source = new carto.source.SQL(other.query);
      const style = new carto.style.CartoCSS(other.cartocss);
      const layer = new carto.layer.Layer(source, style, options);

      if(options.featureClickColumns) {
        layer.on('featureClicked', this.openPopup.bind(this));
      }

      this.props.client.getLeafletLayer().addTo(this.props.map);

      return { ...all, [layerName]: { source, style, layer, ...other } };
    }, {});

    // Add all layers at the same tame so it doesn't reload multiple times
    this.props.client.addLayers(Object.values(cartoLayers).map(item => item.layer));

    // Labels need to be added after the layers
    L.tileLayer(BASEMAP_LABELS).addTo(this.props.map);

    this.props.storeLayers(cartoLayers)
  }

  openPopup(featureEvent) {
    this.popup.setContent('');
    this.popup.setLatLng(featureEvent.latLng);

    if (!this.popup.isOpen()) {
      this.popup.openOn(this.props.map);
      render(<AirbnbPopup {...featureEvent.data} />, this.popup._contentNode);
    }
  }

  render() {
    const { theme, layers } = this.props;
    const hasLayers = Object.keys(layers).length > 0;

    return (
      <ThemeProvider theme={theme}>
        <main>
          <div id="map" />
          {hasLayers && (
            <React.Fragment>
              <ShowOnlyMobile>
                <MobileTabs />
              </ShowOnlyMobile>
              <HideMobile>
                <Legend />
              </HideMobile>
              <Widgets />
            </React.Fragment>
          )}
        </main>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers
});

const mapDispatchToProps = dispatch => ({
  storeLayers: layers => dispatch(storeLayers(layers)),
  setMap: map => dispatch(setMap(map)),
  setBboxFilter: bbox => dispatch(setBboxFilter(bbox)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CARTOMapNew);
