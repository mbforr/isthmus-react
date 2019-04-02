import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../../actions/actions';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import Category from '.././widgets/Category'
import CategoryVL from '.././vlwidgets/CategoryVL'
import HistogramVL from '.././vlwidgets/HistogramVL'
import Formula from '.././widgets/Formula'
import Range from '.././widgets/Range'
import Export from '.././widgets/Export'
import '@carto/airship-style';

class RightBar extends Component {

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
    const z = `as-sidebar as-sidebar--${this.props.size} as-sidebar--right ${this.props.background}`;
    this.setState({size: z})
  }

  render() {

    return (
      <aside className={this.state.size} data-name={this.props.name}>
      <div className="as-m--24">      
      <CategoryVL
        title='State'
        description='Total damage for each railroad company in USD'
        layer={this.props.layers.railaccidents}
        column='railroad'
        max={10}
      />
      <HistogramVL
        title='State'
        description='Total damage for each railroad company in USD'
        layer={this.props.layers.railaccidents}
        column='total_damage'
        max={5}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(RightBar);
