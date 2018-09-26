import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../../actions/actions';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import Button from '.././widgets/Button'
import Formula from '.././widgets/Formula'
import '@carto/airship-style';
import L from 'leaflet'

class LeftBar extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
    this.moveMap = this.moveMap.bind(this);
  }

  state = {
    size: null
  };

  moveMap() {
    this.props.map.flyTo([39.8283459, -98.5794797], 4);
  }


  componentDidMount() {
    const z = `as-sidebar as-sidebar--${this.props.size} as-sidebar--left`;
    this.setState({size: z})
  }

  render() {

    return (
      <aside className={this.state.size}>
      <div className="as-m--24">
      <Button
        name='CLICK'
        action={this.moveMap}
        type='secondary'
        size=''
      />
      <div className="as-p--16">
      <Formula
        title='Employees Injured'
        description='Total number of employee injuries'
        round={true}
        currency={false}
        layer={this.props.layers.railaccidents.source}
        column='rr_employees_injured'
        operation={carto.operation.SUM}
      />
      </div>
      </div>
      </aside>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
