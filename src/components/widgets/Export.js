import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';
import C from '../../data/C'

const { SQL_API_URL} = C;

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
    var url = `${SQL_API_URL}${query}&format=${this.props.format}&filename=${this.props.filename}.${this.props.format}`
    window.open(url)
  }

  render() {

    return (
      <button className="as-btn as-btn--primary as-btn--l" onClick={this.exportData}>
        <i aria-hidden class="as-icon-arrow-down"></i>
        <p>Export Data</p>
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
