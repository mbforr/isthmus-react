import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { operation } from '@carto/carto.js';
import '@carto/airship-style';
import Formula from '../widgets/Formula'
import Category from '../widgets/Category'
import Histogram from '../widgets/Histogram'

import Table from '../widgets/Table'
import { min } from 'gl-matrix/src/gl-matrix/vec2';

const BottomBar = ({ background, layers, name }) => {

  const backgroundFinal = `as-map-footer ${background}`

  return (
    <footer className={backgroundFinal} data-name={name}>
      <div className="as-box">
        
        <div className="as-box--scroll">
          <Table 
            query={`SELECT location_name, address, CONCAT(median_dwell, ' min.'), raw_visit_counts, raw_visitor_counts FROM acreage_data_samples_safegraph_sample_2_422`}
            useMapBounds={true}
            useLimit={15}
            headers={['Location', 'Address', 'Avg. Dwell', 'Visits', 'Visitors']}
          />
        </div>
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