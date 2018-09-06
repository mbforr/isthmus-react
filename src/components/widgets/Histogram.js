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
    this.dataView = new carto.dataview.Histogram(this.props.layers.railaccidents.source, 'rr_employees_injured', {
      bins: 10
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
   const filter = new carto.filter.Range('rr_employees_injured', { between: { min, max } });
   this.props.layers.railaccidents.source.addFilter(filter);
   this.setState({ filter });
 }

 updateFilter() {
   const { range, filter } = this.state
   const min = range[0]
   const max = range[1]
   filter.setFilters({ between: { min, max } });
 }

 onApplySelection() {
   const { filter, range } = this.state;
   !filter
     ? this.createFilter()
     : this.updateFilter();
 }

 onSelectedChanged = ({ detail }) => {
   let { filter } = this.state;

   if (filter) {
     this.props.layers.railaccidents.source.removeFilter(filter);
     filter = null;
   }
   console.log('ITS ME', detail)
   this.setState({ range: detail, filter });

 }

 completeUpdateRangeFilter(event) {
   const { onSelectedChanged } = this;
   onSelectedChanged && onSelectedChanged(event);

 }


  setupEvents() {
    this.widget.addEventListener('selectionChanged', (event) => {
      this.completeUpdateRangeFilter(event)

      //this.onSelectedChanged(event)
      
    });
  }


  render() {
    const { data } = this.state;

    return (
      <as-histogram-widget
        ref={node => { this.widget = node; }}
        heading="Title"
        description="Description"
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
