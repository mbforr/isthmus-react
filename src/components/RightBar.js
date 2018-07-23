import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../actions/actions';
import carto from '@carto/carto.js';
// import { Category, Slider } from './widgets'
import Slider from './widgets/Slider'
import Category from './widgets/Category'

class RightBar extends Component {

  render() {
    return (
      <div className="rightbar">
        <Category
          layer={ this.props.layers.railaccidents }
          limit={ 10 }
          operation={ carto.operation.SUM }
          operationColumn='total_damage'
          column='railroad'
        />
        <Slider
          title='Total damage'
          description='Total damage in dollars'
          layer={ this.props.layers.railaccidents }
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  layers: state.layers
});

const mapDispatchToProps = dispatch => ({
  setNeighbourhoods: selected => dispatch(setNeighbourhoods(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightBar);
