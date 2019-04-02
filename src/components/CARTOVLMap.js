import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { storeLayers, setMap, setBboxFilter, changeViewport, changeCartoBBox, addBridge } from '../actions/actions';
import vectorlayers from '../data/vectorlayers/VLindex';
import C from '../data/C'
import '@carto/airship-style';
import carto from '@carto/carto-vl'
import { VLBridge } from '@carto/airship-bridge'


// import carto from '@carto/carto-vl'
import mapboxgl from 'mapbox-gl'

// import './index.css';

const { BASEMAP, BASEMAP_LABELS, CENTER, ZOOM, USERNAME, API_KEY } = C;

class CARTOVLMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props
    }
  }

  componentDidMount() {

    const map = new mapboxgl.Map({
        container: 'map',
        style: carto.basemaps.darkmatter,
        center: [CENTER[1], CENTER[0]],
        zoom: ZOOM,
        hash: true,
        scrollZoom: false,
      });

    // const map = L.map('map', { zoomControl: false, maxZoom: 18 }).setView(this.props.viewport.center, this.props.viewport.zoom);

    this.props.setMap(map);

    const nav = new mapboxgl.NavigationControl({
        showCompass: true
      });
    
    map.addControl(nav, 'top-left');

    carto.setDefaultAuth({
        username: USERNAME,
        apiKey: API_KEY
    })

    console.log(map.getBounds())

    // L.control.zoom({ position: 'bottomleft' }).addTo(map);

    // this.popup = L.popup({ closeButton: false });

    map.on('moveend', event => {
      const boundingBox = event.target.getBounds();
      const newCenter = event.target.getCenter();
      const newZoom = event.target.getZoom();
      const newViewport = {
        center: newCenter,
        zoom: newZoom
      }

      this.props.setBboxFilter([
        boundingBox._ne.lat,
        boundingBox._ne.lng,
        boundingBox._sw.lat,
        boundingBox._sw.lng
      ])

      this.props.changeViewport(newViewport);

    });



  }

  setupLayers() {
    const cartoLayers = Object.keys(vectorlayers).reduce((all, layerName) => {
      const { ...other} = vectorlayers[layerName];

      const viz = new carto.Viz(other.style);

      const source = new carto.source.Dataset(other.table);

      const layer = new carto.Layer(other.table, source, viz);

      layer.addTo(this.props.map, 'watername_ocean');

    //   if(options.featureClickColumns) {
    //     layer.on('featureClicked', this.openPopup.bind(this));
    //   }

    const bridge = new VLBridge({
      carto: carto,
      map: this.props.map,
      layer: layer,
      source: source
    });

      return { ...all, [layerName]: { source, viz, layer, bridge, ...other } };
    }, {});

    console.log('LAYERS: ', cartoLayers)
    this.props.storeLayers(cartoLayers) 
    setTimeout(() => {
      const { layers } = this.props
      this.props.addBridge(layers)
    }, 4000)
     
  }

  updateBriges() {
    
    console.log('LAYERS: ', layers)
    
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.map && this.props.map) {
      this.setupLayers();
    }
  }

//   openPopup(featureEvent) {
//     this.popup.setContent('');
//     this.popup.setLatLng(featureEvent.latLng);

//     if (!this.popup.isOpen()) {
//       this.popup.openOn(this.props.map);
//       render(<InfoWindow {...featureEvent.data} />, this.popup._contentNode);
//     }
//   }

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
  changeCartoBBox: boundingbox => dispatch(changeCartoBBox(boundingbox)),
  addBridge: layers => dispatch(addBridge(layers))
});

export default connect(mapStateToProps, mapDispatchToProps)(CARTOVLMap);
