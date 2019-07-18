import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../../actions/actions';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import Category from '.././widgets/Category'
import CategoryVL from '.././vlwidgets/CategoryVL'
import HistogramVL from '.././vlwidgets/HistogramVL'
import RangeVL from '.././vlwidgets/RangeVL'
import Formula from '.././widgets/Formula'
import Range from '.././widgets/Range'
import Export from '.././widgets/Export'
import FormulaVL from '.././vlwidgets/FormulaVL'
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
        totals={false}
        max={25}
      />
      <RangeVL
        title='adsfasdfaf'
        description='afdasdfadsfasdf'
        layer={this.props.layers.railaccidents}
        column='total_damage'
      />
      <FormulaVL
        title='Total Damage'
        description='Maximum total damage in USD for accidents in view'
        round={true}
        currency={true}
        locale='en-US'
        currencyType='USD'
        layer={this.props.layers.railaccidents}
        feature={this.props.layers.railaccidents.viz.variables.v_avg.value}
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
