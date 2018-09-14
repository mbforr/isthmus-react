import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../actions/actions';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import Category from './widgets/Category'
import Histogram from './widgets/Histogram'
import Export from './widgets/Export'
import airship from '@carto/airship-style'

class RightBar extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
  }

  render() {

    return (
      <div>
      <Export
        layer={this.props.layers.railaccidents.source}
        format='shp'
        filename='rail_data'
        name='Export Data'
      />
    <br />
      <Category
        heading='State'
        description='Total damage for each railroad company in USD'
        categoryLayer={this.props.layers.railaccidents.source}
        column='state'
        operation={carto.operation.SUM}
        operationColumn='equipment_damage'
      />
      <Histogram />
      </div>
    )
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
  setNeighbourhoods: selected => dispatch(setNeighbourhoods(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightBar);
