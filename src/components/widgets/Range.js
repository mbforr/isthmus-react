import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';


class Range extends Component {

  state = {
    data: [],
    range: null,
    filter: null
  };

 //  componentDidMount() {
 //    this.setupConfig();
 //    this.setupEvents();
 //    this.addDataview();
 //  }
 //
 //  componentDidUpdate(prevProps) {
 //    this.setupConfig();
 //    const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.props.map)
 //
 //    if(prevProps !== this.props) {
 //      this.dataView.addFilter(this.props.boundingbox);
 //    }
 //  }
 //
 //  setupConfig() {
 //    const { data } = this.state
 //    this.widget.data = data;
 //  }
 //
 //  addDataview() {
 //    this.dataView = new carto.dataview.Histogram(this.props.layers.railaccidents.source, 'rr_employees_injured', {
 //      bins: 1
 //    });
 //
 //    this.dataView.on('dataChanged', ( data ) => {
 //      const d = data.bins
 //      const finalData = d.map(d => ({ start: d.start, end: d.end, value: d.freq }))
 //      this.setState({ data: finalData })
 //
 //    });
 //
 //    this.props.client.addDataview(this.dataView);
 // }
 //
 // createFilter() {
 //   const { range } = this.state
 //   const min = range[0]
 //   const max = range[1]
 //   const filter = new carto.filter.Range('rr_employees_injured', { between: { min, max } });
 //   this.props.layers.railaccidents.source.addFilter(filter);
 //   this.setState({ filter: filter });
 //
 // }
 //
 // updateFilter() {
 //   const { range, filter } = this.state
 //   const min = range[0]
 //   const max = range[1]
 //   filter.setFilters({ between: { min, max } });
 // }
 //
 // onApplySelection() {
 //   const matt = this.props.layers.railaccidents.source._appliedFilters._filters
 //   const { filter, range } = this.state;
 //   !filter
 //     ? this.createFilter()
 //     : this.updateFilter();
 // }
 //
 // onSelectedChanged = ({ detail }) => {
 //   let { filter } = this.state;
 //   if (!detail.length) {
 //     this.props.layers.railaccidents.source.removeFilter(filter);
 //     filter = null;
 //     this.setState({ filter });
 //     console.log('onSelectedChanged DID SOMETHING')
 //   }
 // }
 //
 // completeUpdateRangeFilter(event) {
 //   const { onSelectedChanged } = this;
 //   const { data } = this.state;
 //   onSelectedChanged && onSelectedChanged(event);
 //   console.log(data, this.widget.data)
 //   //if (event.detail !== this.state.range) {
 //    if (this.widget.data === data && event.detail === this.state.range) {
 //      console.log('DATA VALUE', data === this.widget.data)
 //      console.log('RANGE VALUE', event.detail === this.state.range)
 //     this.onApplySelection()
 //   }
 // }
 //
 //  setupEvents() {
 //    let { range, filter } =  this.state;
 //    this.widget.addEventListener('selectionChanged', (event) => {
 //      this.setState({ range: event.detail });
 //      this.completeUpdateRangeFilter(event)
 //    });
 //  }

  render() {
    const { data } = this.state;


    return (
      <as-range-slider
        ref={node => { this.widget = node; }}
        min-value="25"
        range={[30, 70]}
        step={5}
        draggable={true}
        max-value="75">
      </as-range-slider>
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
