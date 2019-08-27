import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';
import C from '../../data/C'

const { SQL_API_URL, API_KEY } = C;

class Export extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
      this.exportData = this.exportData.bind(this);
  }

  exportData() {
    const query = this.props.layer._getQueryToApply()
    console.log(query)
    let url = `${SQL_API_URL}q=${query}&format=${this.props.format}&filename=${this.props.filename}.${this.props.format}&api_key=${API_KEY}`
    console.log(url)
    window.open(url)
  }

  render() {

    return (
      <button className="as-btn as-btn--secondary" onClick={this.exportData}>
        <i aria-hidden className="as-icon as-icon-arrow-down"></i>
        <p>{this.props.name}</p>
      </button>
    );
  }

}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  filters: state.filters,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

const mapDispatchToProps = dispatch => ({
  setNeighbourhoods: selected => dispatch(setNeighbourhoods(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Export);
