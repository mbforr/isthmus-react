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


  componentDidMount() {
    const z = `as-sidebar as-sidebar--${this.props.size} as-sidebar--left ${this.props.background}`;
    this.setState({size: z})
  }

  render() {

    return (
      <aside className={this.state.size} data-name={this.props.name}>
      <div className="as-m--24">
      <LinkButton
        name='CARTO Website'
        link='https://carto.com'
        type='primary'
        size=''
      />
      <InputButton
        name='Input Button'
        type='primary'
        size='l'
      />
      <Badge
        color='green'
        name='Badge Component'
        text='as-color--type-02'
      />
      <IconBadge
        color='success'
        name='Icon Badge Component'
        text='as-color--type-04'
        icon='as-icon-info'
      />
      <Button
        name='Center Map'
        action={this.moveMap}
        type='secondary'
        size=''
      />
      <div className="as-p--16">
      <Formula
        title='Employees Injured'
        description='Total number of employee injuries'
        round={true}
        currency={false}
        locale='en-US'
        currencyType='USD'
        layer={this.props.layers.railaccidents.source}
        column='rr_employees_injured'
        operation={carto.operation.SUM}
      />
      </div>
      <TextSearch
        title='Accident Description'
        description='Search text in the accident description field'
        id='search'
        placeholder='Search...'
        column='narrative'
      />
      <Input
        id='input'
        placeholder='Text Input'
      />
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
