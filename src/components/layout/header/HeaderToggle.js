import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

class HeaderToggle extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }

      this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    document.querySelector('.as-toolbar__actions').classList.toggle('as-toolbar__actions--visible');
  }

  render() {
    return(
      <button
        onClick={this.toggleDrawer}
        className="as-toolbar__item as-toolbar__toggle">
        <i className="as-icon-hamburguer as-title as-m--0"></i>
      </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderToggle);
