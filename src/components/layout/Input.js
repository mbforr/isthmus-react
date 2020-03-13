import React, { Component } from 'react';
import { connect } from 'react-redux';
import '@carto/airship-style';


const Input = ({ id, placeholder }) => {
  return (
    <div className="as-p--16">
      <input
        className="as-input"
        id={id}
        type="text"
        placeholder={placeholder}
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
