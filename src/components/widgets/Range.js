import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';


class Range extends Component {

  state = {
    data: null,
    min: 0,
    max: 0,
    rangeMin: 0,
    rangeMax: 0,
    range: [0, 0],
    filter: null
  };

  componentDidMount() {
    this.setupEvents();
    this.addDataview();
  }

  componentDidUpdate(prevProps) {
    const { filter } = this.state;
    this.setupRange();
  }

  setupRange() {
    const { rangeMin, rangeMax } = this.state
    this.widget.range = [rangeMin, rangeMax]
  }

  addDataview() {

    this.dataViewMin = new carto.dataview.Formula(this.props.layer, this.props.column, {
      operation: carto.operation.MIN
    });

    this.dataViewMax = new carto.dataview.Formula(this.props.layer, this.props.column, {
      operation: carto.operation.MAX
    });

    this.dataViewMin.on('dataChanged', newData => {
      let minimum
      minimum = newData.result
      this.setState({ min: minimum })
      this.setState({ rangeMin: minimum })
    })

    this.dataViewMax.on('dataChanged', newData => {
      let maximum
      maximum = newData.result
      this.setState({ max: maximum })
      this.setState({ rangeMax: maximum })
    })

    this.props.client.addDataview(this.dataViewMin);
    this.props.client.addDataview(this.dataViewMax);

 }

 createFilter() {
   const { rangeMin, rangeMax } = this.state
   const minRange = rangeMin
   const maxRange = rangeMax
   const filter = new carto.filter.Range(this.props.column, { gte: minRange, lte: maxRange });
   this.props.layers.railaccidents.source.addFilter(filter);
   this.setState({ filter: filter });
 }

 updateFilter() {
   const { filter, data } = this.state
   const minRangeTwo = data[0]
   const maxRangeTwo = data[1]
   filter.setFilters({ gte: minRangeTwo, lte: maxRangeTwo });
 }

 onApplySelection() {
   const { filter } = this.state;
   !filter
     ? this.createFilter()
     : this.updateFilter();
 }

 setupEvents() {
    const { before, after } = this.props;
    this.widget.formatValue = (value) => (`${before}${value}${after}`)
    this.widget.addEventListener('changeEnd', (event) => {
      this.setState({ data: event.detail })
      this.setState({ rangeMin: event.detail[0] })
      this.setState({ rangeMax: event.detail[1] })
      this.onApplySelection();
    })
 }

  render() {
    const { data } = this.state;
    const { title, description } = this.props;

    return (
      <div>
      <h4 className="as-subheader as-font--medium">{title}</h4>
      <p className="as-body">{description}</p>
      <as-range-slider
        ref={node => { this.widget = node; }}
        min-value={this.state.min}
        step={this.props.step}
        draggable={true}
        max-value={this.state.max}>
      </as-range-slider>
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
  setNeighbourhoods: selected => dispatch(setNeighbourhoods(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Range);
