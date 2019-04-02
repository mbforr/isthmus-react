import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import carto from '@carto/carto-vl'
import { addBridge } from '../../actions/actions';
// import { AsBridge } from '../../airship/packages/bridge/dist/asbridge.js'




class HistogramVL extends Component {

  static defaultProps = {

  };

  state = {
    data: [],
    range: null, 
    filter: null
  };

  componentDidMount() {

}


  _setupBridge() {
    this.props.layers.railaccidents.bridge.histogram(this.widget, 'total_damage', {
      readOnly: false,
      totals: true,
      buckets: 10
    });

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

        <as-histogram-widget
            ref={node => { this.widget = node; }}
            heading={title}
            description={description}
            show-header
            show-clear
        />

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

export default connect(mapStateToProps, mapDispatchToProps)(HistogramVL);
