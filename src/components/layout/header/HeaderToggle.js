import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

const HeaderToggle = () => {
  const toggleDrawer = () => {
    document.querySelector('.as-toolbar__actions').classList.toggle('as-toolbar__actions--visible');
  }
  return(
    <button
      onClick={toggleDrawer}
      className="as-toolbar__item as-toolbar__toggle">
      <i className="as-icon-hamburguer as-title as-m--0"></i>
    </button>
  );
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  filters: state.filters,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});


export default connect(mapStateToProps)(HeaderToggle);
