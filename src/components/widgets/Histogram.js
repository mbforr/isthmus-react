import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';


class Histogram extends Component {

  static defaultProps = {
    // showHeader: true,
    // showClearButton: true,
    // useTotalPercentage: false,
    // visibleCategories: Infinity,
  };

  state = {
    data: [],
    range: null,
    filter: null
  };

  componentDidMount() {
    this.setupConfig();
    this.setupEvents();
    this.addDataview();
  }

  componentDidUpdate(prevProps) {
    this.setupConfig();
    const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.props.map)

    if(prevProps !== this.props) {
      this.dataView.addFilter(this.props.boundingbox);
    }
  }

  setupConfig() {
    const { data } = this.state
    this.widget.data = data;
  }

  addDataview() {
    this.dataView = new carto.dataview.Histogram(this.props.layer, this.props.column, {
      bins: this.props.bins
    });

    this.dataView.on('dataChanged', ( data ) => {
      const d = data.bins
      const finalData = d.map(d => ({ start: d.start, end: d.end, value: d.freq }))
      this.setState({ data: finalData })

    });

    this.props.client.addDataview(this.dataView);
 }

 createFilter() {
   const { range } = this.state
   const min = range[0]
   const max = range[1]
   const filter = new carto.filter.Range(this.props.column, { between: { min, max } });
   this.props.layer.addFilter(filter);
   this.setState({ filter: filter });

 }

 updateFilter() {
   const { range, filter } = this.state
   const min = range[0]
   const max = range[1]
   filter.setFilters({ between: { min, max } });
   console.log(this.state.filter)
 }

 onApplySelection() {
   const matt = this.props.layer._appliedFilters._filters
   const { filter, range } = this.state;
   !filter
     ? this.createFilter()
     : this.updateFilter();
 }

 onSelectedChanged = ({ detail }) => {
   let { filter } = this.state;
   if (!detail) {
     this.props.layer.removeFilter(filter);
     filter = null;
     this.setState({ filter });
   }
 }

 completeUpdateRangeFilter(event) {
   const { onSelectedChanged } = this;
   const { data } = this.state;
   onSelectedChanged && onSelectedChanged(event);
  //  console.log(data, this.widget.data)
   //if (event.detail !== this.state.range) {
  if (event.detail) {
    if (this.widget.data === data && event.detail.selection === this.state.range) {
      console.log('DATA VALUE', data === this.widget.data)
      console.log('RANGE VALUE', event.detail.selection === this.state.range)
     this.onApplySelection()
   }
  }
 }

  setupEvents() {
    let { range, filter } =  this.state;
    this.widget.addEventListener('selectionChanged', (event) => {
      if (!event.detail) {
        this.setState({ range: null });
      } else {
        this.setState({ range: event.detail.selection });
      }
      this.completeUpdateRangeFilter(event)
    });
  }




  render() {
    const { data } = this.state;
    const { title, description } = this.props;

    return (
      <as-histogram-widget
        ref={node => { this.widget = node; }}
        heading={title}
        description={description}
        data={data}
        show-header
        show-clear
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Histogram);
