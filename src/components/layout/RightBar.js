import React, {useState} from 'react';
import { connect } from 'react-redux';
import { operation } from '@carto/carto.js';
import Category from '.././widgets/Category'
import Histogram from '.././widgets/Histogram'
import Formula from '.././widgets/Formula'
import Range from '.././widgets/Range'
import Export from '.././widgets/Export'
import '@carto/airship-style';
import { set } from 'gl-matrix/src/gl-matrix/mat2d';

const RightBar = ({ layers, size, background, name }) => {
  const z = `as-sidebar as-sidebar--${size} as-sidebar--right ${background}`;

  return (
    <aside className={z} data-name={name}>
    <div className="as-m--24">
    <Range
      before=''
      after='°F'
      title='Temperature'
      description='Temperature at the time of the accident'
      layer={layers.railaccidents.source}
      column='temp'
      step={1}
    />
    </div>
    <div className="as-p--16">
    <Formula
      title='Total Damage'
      description='Average total damage in USD for accidents in view'
      round={true}
      currency={true}
      locale='en-US'
      currencyType='USD'
      layer={layers.railaccidents.source}
      column='total_damage'
      operation={operation.AVG}
    />
    </div>
    <div className="as-p--16">
    <Export
      layer={layers.railaccidents.source}
      format='csv'
      filename='rail_data'
      name='Export Data'
    />
    </div>
    <Category
      title='State'
      description='Total damage for each railroad company in USD'
      categoryLayer={layers.railaccidents.source}
      column='state'
      operation={operation.SUM}
      operationColumn='equipment_damage'
    />
    <div className="as-p--16">
    <Histogram
      title='Hour'
      description='Hour at the time of the accident'
      layer={layers.railaccidents.source}
      column='hour'
      bins={12}
    />
    </div>
    </aside>

  )}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});


export default connect(mapStateToProps)(RightBar);
