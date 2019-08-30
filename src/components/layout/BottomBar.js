import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { operation } from '@carto/carto.js';
import '@carto/airship-style';
import Formula from '../widgets/Formula'
import Table from '../widgets/Table'

const BottomBar = ({ background, layers, name }) => {

  const backgroundFinal = `as-map-footer ${background}`

  return (
    <footer className={backgroundFinal} data-name={name}>
      <div className="as-box">
          <Formula
            title='Total Damage'
            description='Maximum total damage in USD for accidents in view'
            round={false}
            currency={true}
            locale='es-ES'
            currencyType='EUR'
            layer={layers.railaccidents.source}
            column='total_damage'
            operation={operation.MAX}
          />
        </div>
        <div className="as-box--scroll">
          <Table 
            query={'SELECT railroad, weather, total_damage, temp FROM rail_accidents'}
            useMapBounds={true}
            useLimit={20}
            headers={['Railroad', 'Weather', 'Damage', 'Temprature']}
          />
        </div>
    </footer>
  )
}


const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

export default connect(mapStateToProps)(BottomBar);