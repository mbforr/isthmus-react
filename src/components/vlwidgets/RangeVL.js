import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import carto from '@carto/carto-vl'
import { addBridge } from '../../actions/actions';

class RangeVL extends Component {

  static defaultProps = {

  };

  state = {
    data: [],
    range: null, 
    filter: null
  };

  _setupBridge() {

    this.widget.formatValue = this.widget.formatValue = (value) => `${value}° F`;

    this.props.layers.railaccidents.bridge.globalRange(this.widget, 'temp');

    const { layers } = this.props

  }

  componentDidUpdate(prevProps) {
    if (this.props.layers !== prevProps.layers) {
      this._setupBridge()
    }
  }

  render() {
    const { data } = this.state;
    const { title, description } = this.props;

    

    return (
    <div className="as-p--16">
    <as-widget-header no-data-message="NO DATA AVAILABLE" class="hydrated">
      <h2 className="as-widget-header__header">{title}</h2>
      <p className="as-widget-header__subheader as-body">{description}</p>
      <as-range-slider
        ref={node => { this.widget = node; }}
        step={5}
        draggable={true}
      >
      </as-range-slider>
    </as-widget-header>
    </div>
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
    addBridge: layers => dispatch(addBridge(layers))
});

export default connect(mapStateToProps, mapDispatchToProps)(RangeVL);
