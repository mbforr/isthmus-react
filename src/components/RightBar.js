import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../actions/actions';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import Category from './widgets/Category'
import Histogram from './widgets/Histogram'
import Formula from './widgets/Formula'
import Range from './widgets/Range'
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
      <div className="as-p--16">
      <Range />
      </div>
      <div className="as-p--16">
      <Formula
        title='Total Damage'
        description='Average total damage in USD for accidents in view'
        round={true}
        currency={true}
        layer={this.props.layers.railaccidents.source}
        column='total_damage'
        operation={carto.operation.AVG}
      />
      </div>
      <div className="as-p--16">
      <Export
        layer={this.props.layers.railaccidents.source}
        format='shp'
        filename='rail_data'
        name='Export Data'
      />
      </div>
      <div className="as-p--16">
      <Category
        heading='State'
        description='Total damage for each railroad company in USD'
        categoryLayer={this.props.layers.railaccidents.source}
        column='state'
        operation={carto.operation.SUM}
        operationColumn='equipment_damage'
      />
      </div>
      <div className="as-p--16">
      <Histogram />
      </div>
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
