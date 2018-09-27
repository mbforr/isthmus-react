import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';


class Formula extends Component {

  state = {
    data: 0,
    range: null,
    filter: null
  };

  componentDidMount() {
    this.addDataview();
  }

  componentDidUpdate(prevProps) {
    const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.props.map)

    if(prevProps !== this.props) {
      this.dataView.addFilter(this.props.boundingbox);
    }
  }

  addDataview() {

    const { locale, currencyType } = this.props;

    this.dataView = new carto.dataview.Formula(this.props.layer, this.props.column, {
      operation: this.props.operation
    });

    this.dataView.on('dataChanged', newData => {
      let formattedData
      if (this.props.round === true && this.props.currency === false) {
        formattedData = newData.result.toLocaleString(locale, {maximumFractionDigits: 0})
      } else if (this.props.currency === true && this.props.round === false) {
        formattedData = newData.result.toLocaleString(locale, {maximumFractionDigits: 2, style: 'currency', currency: currencyType})
      } else if (this.props.currency === true && this.props.round === true) {
        formattedData = newData.result.toLocaleString(locale, {maximumFractionDigits: 0, minimumFractionDigits: 0, style: 'currency', currency: currencyType})
      } else {
        formattedData = newData.result.toLocaleString(locale, {maximumFractionDigits: 2})
      }

      this.setState({ data: formattedData })

    });

    this.props.client.addDataview(this.dataView);
 }


  render() {
    const { data } = this.state;
    const { title, description } = this.props;

    return (
      <div>
        <h4 className="as-subheader as-font--medium">{title}</h4>
        <p className="as-body">{description}</p>
        <h2 className="as-display">{data}</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(Formula);
