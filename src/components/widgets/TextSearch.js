import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';

class TextSearch extends Component {

  state = {
    data: 0,
    value: null,
    filter: null
  };

  componentDidMount() {
    // this.addDataview();
    this.setupEvents();

  }

  setupEvents() {
    const { id } = this.props;
    const textInput = document.getElementById(id);

    let timeout = null;
    textInput.onkeyup = e => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            console.log('Input Value:', textInput.value);
            this.setState({ value: textInput.value })
            this.setUpFilter();
        }, 200);

    };
  }

  createFilter() {
    const filter = new carto.filter.Category('narrative', { similarTo: this.state.value });
    this.props.layers.railaccidents.source.addFilter(filter);
    this.setState({  filter });
  }

  updateFilter() {
    this.filter.setFilters({ similarTo: this.state.value });
  }

  setUpFilter() {
    const { filter, value } = this.state;
    console.log(value)
    !filter
      ? this.createFilter()
      : this.updateFilter();
  }
 //
 //  componentDidUpdate(prevProps) {
 //    const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.props.map)
 //
 //    if(prevProps !== this.props) {
 //      this.dataView.addFilter(this.props.boundingbox);
 //    }
 //  }
 //
 //  addDataview() {
 //    this.dataView = new carto.dataview.Formula(this.props.layer, this.props.column, {
 //      operation: this.props.operation
 //    });
 //
 //    this.dataView.on('dataChanged', newData => {
 //      let formattedData
 //      if (this.props.round === true && this.props.currency === false) {
 //        formattedData = newData.result.toLocaleString('en-US', {maximumFractionDigits: 0})
 //      } else if (this.props.currency === true && this.props.round === false) {
 //        formattedData = newData.result.toLocaleString('en-US', {maximumFractionDigits: 2, style: 'currency', currency: 'USD'})
 //      } else if (this.props.currency === true && this.props.round === true) {
 //        formattedData = newData.result.toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0, style: 'currency', currency: 'USD'})
 //      } else {
 //        formattedData = newData.result.toLocaleString('en-US', {maximumFractionDigits: 2})
 //      }
 //
 //      this.setState({ data: formattedData })
 //
 //    });
 //
 //    this.props.client.addDataview(this.dataView);
 // }


  render() {
    // const { data } = this.state;
    const { title, description, id } = this.props;

    return (
      <div>
        <h4 className="as-subheader as-font--medium">{title}</h4>
        <p className="as-body">{description}</p>
        <input className="as-input" id={id} type="text" placeholder="Hello there"></input>
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

export default connect(mapStateToProps, mapDispatchToProps)(TextSearch);
