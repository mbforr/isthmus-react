import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../../actions/actions';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import Category from '.././widgets/Category'
import Histogram from '.././widgets/Histogram'
import Formula from '.././widgets/Formula'
import Range from '.././widgets/Range'
import Export from '.././widgets/Export'
import '@carto/airship-style';

class LeftBar extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
  }

  state = {
    size: null
  };



  componentDidMount() {
    const z = `as-sidebar as-sidebar--${this.props.size} as-sidebar--left`;
    this.setState({size: z})
  }

  render() {

    return (
      <aside className={this.state.size}>
      <div className="as-m--24">
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
