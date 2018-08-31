import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../actions/actions';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import Category from './widgets/Category'
import airship from '@carto/airship-style'

// import { Category, Slider } from './widgets'
//import Slider from './widgets/Slider'

class RightBar extends Component {

  constructor(props) {
    super(props);
      this.state = {
        categories: [],
        selection: [],
        filter: null,
        ...props
      }

  }

 //  componentDidMount() {
 //    this._addDataview();
 //  }
 //
 //
 //
 //  _addDataview() {
 //    this.dataView = new carto.dataview.Category(this.props.layers.railaccidents.source, 'railroad', {
 //      limit: 10,
 //      operation: carto.operation.SUM,
 //      operationColumn: 'total_damage',
 //    });
 //
 //    this.dataView.on('dataChanged', ({ categories }) => this.setState({ categories }));
 //    this.props.client.addDataview(this.dataView);
 // }
 //
 //
 //   componentDidUpdate(prevProps) {
 //     const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.props.map)
 //     // this.dataView.addFilter(this.props.boundingbox);
 //     // this.dataView.on('dataChanged', this.onDataChanged);
 //
 //     if(prevProps !== this.props) {
 //       this.dataView.addFilter(this.props.boundingbox);
 //     }
 //
 //   }
 //
 //  _createFilter() {
 //    const filter = new carto.filter.Category('railroad', { in: this.state.selection });
 //    this.props.layers.railaccidents.source.addFilter(filter);
 //    this.setState({  filter });
 //  }
 //
 //  _updateFilter() {
 //    this.filter.setFilters({ in: this.state.selection });
 //  }
 //
 //  onSelectedChanged = ({ detail }) => {
 //    let { filter } = this.state;
 //
 //    if (filter && !detail.length) {
 //      this.props.layers.railaccidents.source.removeFilter(filter);
 //      filter = null;
 //    }
 //
 //    this.setState({ selection: detail, filter });
 //  }
 //
 //  onApplySelection = () => {
 //    const { filter, selection } = this.state;
 //
 //    selection.length > 0 && !filter
 //      ? this._createFilter()
 //      : this._updateFilter();
 //  }

  render() {
    const { categories, filter, selection } = this.state;


    return (
      <div>
      <Category
        heading="Business Volume"
        description="Description"
      />
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
