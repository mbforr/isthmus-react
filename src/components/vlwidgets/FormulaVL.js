import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import carto from '@carto/carto-vl'
import { addBridge } from '../../actions/actions';

class FormulaVL extends Component {

  static defaultProps = {

  };

  state = {
    data: 'Loading...'
  };


  addFormula() {

    console.log(this.state.data)
      
    const { locale, currencyType } = this.props;
        let formattedData
        if (this.props.round === true && this.props.currency === false) {
          formattedData = this.props.feature.toLocaleString(locale, {maximumFractionDigits: 0})
        } else if (this.props.currency === true && this.props.round === false) {
          formattedData = this.props.feature.toLocaleString(locale, {maximumFractionDigits: 2, style: 'currency', currency: currencyType})
        } else if (this.props.currency === true && this.props.round === true) {
          formattedData = this.props.feature.toLocaleString(locale, {maximumFractionDigits: 0, minimumFractionDigits: 0, style: 'currency', currency: currencyType})
        } else {
          formattedData = this.props.feature.toLocaleString(locale, {maximumFractionDigits: 2})
        }
  
        this.setState({ data: formattedData })

  }

  componentDidUpdate(prevProps) {
    if (this.props.layers !== prevProps.layers) {
        console.log(this.props.layers)
        this.addFormula()
        console.log('Great Success!!!!')
    }
    if (this.props.viewport !== prevProps.viewport) {
        this.addFormula()
    }
    
  }

  render() {
    const { data } = this.state;
    console.log(data)
    const { title, description } = this.props;

    return (
    <div className="as-p--16">
    <as-widget-header no-data-message="NO DATA AVAILABLE" class="hydrated">
      <h2 className="as-widget-header__header">{title}</h2>
      <p className="as-widget-header__subheader as-body">{description}</p>
      <h2 className="as-display">{data}</h2>
    </as-widget-header>
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
    addBridge: layers => dispatch(addBridge(layers))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormulaVL);
