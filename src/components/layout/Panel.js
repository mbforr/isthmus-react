import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import LayerToggle from '../widgets/LayerToggle'
import '@carto/airship-style';

class Panel extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
  }

  state = {
    position: null
  };

  componentDidMount() {
    const position = `as-panel as-panel--${this.props.horizontal} as-panel--${this.props.vertical}`;
    this.setState({position: position})
  }

  render() {

    return (
      <div className="as-map-panels">
        <div className={this.state.position}>
          <div className="as-panel__element as-p--32">
            <LayerToggle
              layer={this.props.layers.railaccidents}
            />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
