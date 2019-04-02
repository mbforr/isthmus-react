import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto-vl'
// import '@carto/airship-style';
import { addBridge } from '../../actions/actions';
import { bridge } from '@carto/airship-bridge'


class CategoryVL extends Component {

  static defaultProps = {
    showHeader: true,
    showClearButton: true,
    useTotalPercentage: false,
    visibleCategories: 10,
  };

  state = {
    categories: [],
    selection: [],
    data: [],
    filter: null,
    originalStyle: null
  };


  componentDidMount() {
    this._setupConfig();
  }

  _setupConfig() {
    const { layer, bridge } = this.props.layer
    const { showHeader, showClearButton, useTotalPercentage, visibleCategories } = this.props;
    this.widget.showHeader = showHeader;
    this.widget.showClearButton = showClearButton;
    this.widget.useTotalPercentage = useTotalPercentage;
    this.widget.visibleCategories = this.props.max;
  }

  _setupBridge() {
    this.props.layer.bridge.category(this.widget ,this.props.column, {
      column: this.props.column,
      readOnly: false,
      button: this.button
    });

    const { layers } = this.props
  }

  componentDidUpdate(prevProps) {
    if (this.props.layers !== prevProps.layers) {
      this._setupBridge()
    }
  }


  render() {
    const { title, description } = this.props;

    return (
      <div className="as-p--16">
      <as-category-widget
        ref={node => { this.widget = node; }}
        heading={title}
        description={description}
        show-clear
      />
      <button 
        ref={node => { this.button = node; }}
        className="as-btn as-btn--primary"
        >Apply
      </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryVL);