import React, { Component } from 'react';
import { render } from 'react-dom';
import L from 'leaflet';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { storeLayers, setMap, setBboxFilter, changeViewport, changeCartoBBox } from '../actions/actions';
// import { Widgets, Legend, AirbnbPopup, MobileTabs } from '../components/components';
import InfoWindow from '../components/InfoWindow'
import layers from '../data/layers';
import C from '../data/C'
import '@carto/airship-style';

// import './index.css';

const { BASEMAP, BASEMAP_LABELS, CENTER, ZOOM } = C;

class CARTOMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props
    }
  }

  componentDidMount() {

    // look into adding the map up above

    const map = L.map('map', { zoomControl: false, maxZoom: 18 }).setView(this.props.viewport.center, this.props.viewport.zoom);

    this.props.setMap(map);

    L.tileLayer(BASEMAP).addTo(map);

    // L.control.zoom({ position: 'bottomleft' }).addTo(map);

    this.popup = L.popup({ closeButton: false });

    // this.setBbbox(map.getBounds());

    const bboxFilter = new carto.filter.BoundingBoxLeaflet(map);
    this.props.changeCartoBBox(bboxFilter);

    map.on('moveend', event => {
      const boundingBox = event.target.getBounds();
      const newCenter = event.target.getCenter();
      const newZoom = event.target.getZoom();
      const newViewport = {
        center: newCenter,
        zoom: newZoom
      }

      this.props.setBboxFilter([
        boundingBox._northEast.lat,
        boundingBox._northEast.lng,
        boundingBox._southWest.lat,
        boundingBox._southWest.lng
      ])

      this.props.changeViewport(newViewport);
    });



  }

  setupLayers() {
    const cartoLayers = Object.keys(layers).reduce((all, layerName) => {
      const { options, ...other} = layers[layerName];

      const source = new carto.source.SQL(other.query);
      const style = new carto.style.CartoCSS(other.cartocss);
      const layer = new carto.layer.Layer(source, style, options);

      // if(options.featureClickColumns) {
      //   layer.on('featureClicked', this.openPopup.bind(this));
      // }

      // if(options.featureClickColumns && layerName === 'stores') {
      //   console.log(layerName)
      //   layer.on('featureClicked', this.openPopupStores.bind(this));
      // }

      if(options.featureClickColumns && layerName === 'stores') {
        console.log(layerName)
        layer.on('featureClicked', this.openPopupStores.bind(this));
      }

      this.props.client.getLeafletLayer().addTo(this.props.map);

      if (other.visible === false) {
        layer.hide()
      }

      return { ...all, [layerName]: { source, style, layer, ...other } };
    }, {});

    // Add all layers at the same time so it doesn't reload multiple times
    this.props.client.addLayers(Object.values(cartoLayers).map(item => item.layer));

    // Labels need to be added after the layers
    L.tileLayer(BASEMAP_LABELS).addTo(this.props.map);
    console.log(cartoLayers)
    this.props.storeLayers(cartoLayers)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.map && this.props.map) {
      this.setupLayers();
    }
  }

  openPopup(featureEvent) {
    this.popup.setContent('');
    this.popup.setLatLng(featureEvent.latLng);

    if (!this.popup.isOpen()) {
      this.popup.openOn(this.props.map);
      render(<InfoWindow {...featureEvent.data} />, this.popup._contentNode);
      }
    }  

  render() {
    const { layers } = this.props;
    const hasLayers = Object.keys(layers).length > 0;

    return (
        <div id="map"></div>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

const mapDispatchToProps = dispatch => ({
  storeLayers: layers => dispatch(storeLayers(layers)),
  setMap: map => dispatch(setMap(map)),
  setBboxFilter: bbox => dispatch(setBboxFilter(bbox)),
  changeViewport: viewport => dispatch(changeViewport(viewport)),
  changeCartoBBox: boundingbox => dispatch(changeCartoBBox(boundingbox))
});

export default connect(mapStateToProps, mapDispatchToProps)(CARTOMap);
