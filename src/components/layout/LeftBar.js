import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../../actions/actions';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import Button from '.././widgets/Button'
import LinkButton from '.././widgets/LinkButton'
import Badge from '.././widgets/Badge'
import IconBadge from '.././widgets/IconBadge'
import InputButton from '.././widgets/InputButton'
import Import from '.././widgets/Import'

import Formula from '.././widgets/Formula'
import TextSearch from '.././widgets/TextSearch'
import Input from '.././layout/Input'
import '@carto/airship-style';
import L from 'leaflet'

class LeftBar extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
    this.moveMap = this.moveMap.bind(this);

  }

  state = {
    size: null
  };

  moveMap() {
    this.props.map.flyTo([39.8283459, -98.5794797], 4);
  }


  render() {

    const cartocss = `#layer {
        marker-width: 15;
        marker-fill: #EE4D5A;
        marker-fill-opacity: 0.9;
        marker-line-color: #FFFFFF;
        marker-line-width: 1;
        marker-line-opacity: 1;
        marker-placement: point;
        marker-type: ellipse;
        marker-allow-overlap: true;
      }`

    const sql = `SELECT * from a WHERE railroad = 'UP'`

    const size = `as-sidebar as-sidebar--${this.props.size} as-sidebar--left ${this.props.background}`;

    return (
      <aside className={size} data-name={this.props.name}>
      <div className="as-m--24">
      {/*<Import
        title="Import Data Layer"
        description="Import data to add to the map"
        page="/"
        cartocss={cartocss}
        sql={sql}
        back={true}
      />*/}
      {/*<LinkButton
        name='CARTO Website'
        link='https://carto.com'
        type='primary'
        size=''
      />*/}
      {/*<Button
        name='Center Map'
        action={this.moveMap}
        type='secondary'
        size=''
      />*/}
      {/*<TextSearch
        title='Accident Description'
        description='Search text in the accident description field'
        id='search'
        layer={this.props.layers.railaccidents.source}
        placeholder='Search...'
        column='narrative'
      />*/}
      </div>
      </aside>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

const mapDispatchToProps = dispatch => ({
  setNeighbourhoods: selected => dispatch(setNeighbourhoods(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
