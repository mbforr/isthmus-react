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
    this.setupEvents();
  }

  setupEvents() {
    const { id } = this.props;
    const textInput = document.getElementById(id);

    let timeout = null;
    textInput.onkeyup = e => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            const text = textInput.value
            const query = `%(${text.toLowerCase()}|${text.toUpperCase()}|${text})%`
            this.setState({ value: query })
            this.setUpFilter();
        }, 500);

    };
  }

  createFilter() {
    const filter = new carto.filter.Category(this.props.column, { similarTo: this.state.value });
    this.props.layer.addFilter(filter);
    this.setState({ filter });
  }

  updateFilter() {
    const { filter } = this.state;
    this.props.layer.removeFilter(filter);
    this.createFilter()
  }

  setUpFilter() {
    const { filter, value } = this.state;
    !filter
      ? this.createFilter()
      : this.updateFilter();
  }

  render() {
    const { title, description, id } = this.props;


    return (
      <div className="as-p--16">
        <h4 className="as-subheader as-font--medium">{title}</h4>
        <p className="as-body">{description}</p>
        <input className="as-input" id={id} type="text" placeholder={this.props.placeholder}></input>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

const mapDispatchToProps = dispatch => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(TextSearch);
