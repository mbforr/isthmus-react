import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer as Basemap, ZoomControl, Popup } from 'react-leaflet';
import carto from 'carto.js';
import CartoLayer from './CartoLayer';
import mapConfig from '../data/mapConfig';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import C from '../data/C'
import { changeViewport, analyzedStore, setMap } from '../actions/mapsettings';

class CARTOMap extends Component {
  static contextTypes = {
    map: PropTypes.object,
  };

  cartoClient = new carto.Client({ apiKey: C.API_KEY, username: C.USERNAME});

  render() {

    return (
      <Map
        zoomControl={false}
        onClick={this.onItemClick}
        onViewportChanged={this.props.changeViewport}
        viewport={this.props.viewport}
      >
        <Basemap
          attribution="CARTO"
          url={C.BASEMAP}
        />
        <CartoLayer
          source={this.props.rail.source}
          click={this.props.rail.click}
          style={this.props.rail.layerStyle}
          client={this.cartoClient}
          hidden={this.props.rail.hidelayers}
        />
      </Map>
    )
  }
}

const mapStateToProps = (state, props) => ({
  viewport: state.mapsettings.viewport,
  rail: state.mapsettings.rail,
  map: state.mapsettings.map
});

const mapDispatchToProps = (dispatch) => ({
    changeViewport: (viewport) => dispatch(changeViewport(viewport)),
    setMap: (map) => dispatch(setMap(map))
})

export default connect(mapStateToProps, mapDispatchToProps)(CARTOMap);
