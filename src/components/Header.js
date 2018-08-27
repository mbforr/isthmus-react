import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';
import airship from '@carto/airship-style'

class Header extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }

      this._toggleDrawer = this._toggleDrawer.bind(this);
  }

  _toggleDrawer() {
    document.querySelector('.as-toolbar__actions').classList.toggle('as-toolbar__actions--visible');
  }

  render() {
    return(

  <header className="as-toolbar">
      <button
        onClick={this._toggleDrawer}
        className="as-toolbar__item as-toolbar__toggle">
        <i className="as-icon-hamburguer as-title as-m--0"></i>
      </button>

      <div className="as-toolbar__group">
        <div className="as-toolbar__item">
        </div>

        <nav className="as-toolbar__actions">
          <ul>
            <li className="as-toolbar__item">
              <a href="/">Home</a>
            </li>
            <li className="as-toolbar__item">
              <a href="/help">Help</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="as-toolbar__item as-body">
        <i className="as-icon-settings as-subheader as-m--0"></i>
      </div>

    </header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
