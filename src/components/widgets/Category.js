import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from 'carto.js';
import { CategoryWidget } from '@carto/airship'
import Widget from './Widget';
import { setCategory } from '../../actions/mapsettings';

class Cateogry extends Component {

  // static propTypes = {
  //   context: PropTypes.shape({
  //     client: PropTypes.object,
  //     layers: PropTypes.object,
  //     map: PropTypes.object,
  //   }),
  // }

  // state = {
  //   categories: [],
  //   selected: [],
  // }

  getFilters() {
    const filters = Object.values(this.props.filters).filter(filter => !!filter);

    if (!filters.length) return '';

    return `AND ${filters.join(' AND ')}`;
  }

  getQuery() {
    const query = `
      SELECT
        railroad as name,
        count(cartodb_id) as value
      FROM rail_accidents
      ${this.getFilters()}
      GROUP BY railroad
    `;

    return query.trim();
  }

  constructor(props) {
    super(props);

    this.state = {
      ...props
    }

    const { source } = this.props.rail;
    const client = this.props.cartoClient
    const map = this.props.map;

    const sql = source
    const bboxFilter = new carto.filter.BoundingBoxLeaflet(map);

    this.dataView = new carto.dataview.Category(new carto.source.SQL(sql), 'railroad', {
      limit: 10,
      operation: carto.operation.SUM,
      operationColumn: 'total_damage'
    });
    this.dataView.addFilter(bboxFilter);
    this.dataView.on('dataChanged', this.onDataChanged);

    client.addDataview(this.dataView);

  }

  componentWillUnmount() {
    this.dataView.off('dataChanged');
  }

  onDataChanged = (data) => {
    this.setState(data);
  }

  onCategoryClicked = (selected) => {
    this.setState({ selected });
    this.props.setCategory(selected);
  }

  render() {
    const { categories, max, selected } = this.state;

    console.log(this.state)

    return (
      <Widget>
        <Widget.Title>Railroad Company</Widget.Title>
        <Widget.Description>Amount of hosts per neighbourhood.</Widget.Description>

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

const mapStateToProps = (state, props) => ({
  rail: state.mapsettings.rail,
  cartoClient: state.mapsettings.cartoClient
});

const mapDispatchToProps = dispatch => ({
  setCategory: selected => dispatch(setCategory(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cateogry);
