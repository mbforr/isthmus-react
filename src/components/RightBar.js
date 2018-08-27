import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../actions/actions';
import carto from '@carto/carto.js';
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

  componentDidMount() {
    this._addDataview();
  }

  _addDataview() {
    // const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.map);
    console.log(this.props.layers.railaccidents.source)
    const categoryDataview = new carto.dataview.Category(this.props.layers.railaccidents.source, 'railroad', {
      limit: 10,
      operation: carto.operation.SUM,
      operationColumn: 'total_damage',
    });

    console.log(categoryDataview)

    console.log(this.props.categories)

    categoryDataview.on('dataChanged', ({ categories }) => this.setState({ categories }));

    //categoryDataview.addFilter(bboxFilter);
    this.props.client.addDataview(categoryDataview);
 }

  _createFilter() {
    const filter = new carto.filter.Category('railroad', { in: this.state.selection });
    this.source.addFilter(filter);
    this.setState({  filter });
  }

  _updateFilter() {
    this.filter.setFilters({ in: this.state.selection });
  }

  onSelectedChanged = ({ detail }) => {
    let { filter } = this.state;

    if (filter && !detail.length) {
      this.source.removeFilter(filter);
      filter = null;
    }

    this.setState({ selection: detail, filter });
  }

  onApplySelection = () => {
    const { filter, selection } = this.state;

    selection.length > 0 && !filter
      ? this._createFilter()
      : this._updateFilter();
  }

  render() {
    const { categories, filter, selection } = this.state;
    const showApplyButton = selection.length > 0 && !filter;

    return (
      <as-category-widget
        class="as-p--16"
        heading="Business Volume"
        description="Description"
        default-bar-color="#47DB99"></as-category-widget>
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
