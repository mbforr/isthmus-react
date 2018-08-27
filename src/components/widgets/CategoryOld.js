import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';
import { CategoryWidget } from '@carto/airship'
import Widget from './Widget';
import { setNeighbourhoods } from '../../actions/actions';

class Category extends Component {
  // static propTypes = {
  //     client: PropTypes.object,
  //     layers: PropTypes.object,
  //     map: PropTypes.object
  // }
  //
  state = {
    categories: [],
    selected: [],
  }

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }

  }


  componentDidMount() {


    const { source } = this.props.layer;

    const sql = source._query

    this.dataView = new carto.dataview.Category(new carto.source.SQL(sql), this.props.column, {
      limit: 10,
      operation: this.props.operation,
      operationColumn: this.props.operationColumn
    });


    this.props.client.addDataview(this.dataView)

    console.log(this.props.boundingbox)

    this.dataView.on('dataChanged', this.onDataChanged);

  }


  componentDidUpdate(prevProps) {
    const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.props.map)
    // this.dataView.addFilter(this.props.boundingbox);
    // this.dataView.on('dataChanged', this.onDataChanged);

    if(prevProps.filters !== this.props.filters) {
      this.dataView.addFilter(this.props.boundingbox);
      this.dataView.on('dataChanged', this.onDataChanged);
    }

    if (prevProps.filters.neighbourhoods !== this.props.filters.neighbourhoods) {
      this.updateLayer();
    }

  }

  updateLayer() {
    const { bbox, ...others } = this.props.filters;
    const { source, query } = this.props.layer;

    const filters = Object.values(others).filter(filter => !!filter);

    const newQuery = filters.length === 0
      ? query
      : `${query} WHERE ${filters.join(' AND ')}`;

    source.setQuery(newQuery);

    console.log(newQuery)
  }

  onDataChanged = (data) => {
    this.setState(data);
  }

  onCategoryClicked = (selected) => {
    this.setState({ selected });
    this.props.setNeighbourhoods(selected);
  }

  render() {
    const { categories, max, selected } = this.state;

    return (
      <Widget>
        <Widget.Title>Railroad Company</Widget.Title>
        <Widget.Description>Total damage in dollars for each comapny</Widget.Description>

        <CategoryWidget
          categories={categories}
          max={max}
          color={'#3AB5F0'}
          onCategoryClick={this.onCategoryClicked}
          selected={selected}
        />
      </Widget>
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
  setNeighbourhoods: selected => dispatch(setNeighbourhoods(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
