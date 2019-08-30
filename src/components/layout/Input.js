import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import '@carto/airship-style';

const Input = ({ id, required }) => {
  return (
    <div className="as-p--16">
      <input
        className="as-input"
        id={id}
        type="text"
        placeholder={this.props.placeholder}
        ></input>
    </div>
  )
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  filters: state.filters,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});


export default connect(mapStateToProps)(Input);
