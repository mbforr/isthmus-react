import React from 'react';
import { connect } from 'react-redux';
import LayerToggle from '../widgets/LayerToggle'
import StyleToggle from '../widgets/StyleToggle'
import '@carto/airship-style';

const Panel = ({ horizontal, vertical, background, layers }) => {
  const position = `as-panel as-panel--${horizontal} as-panel--${vertical}`;

  const cartocss = `#layer {
    marker-width: ramp([equipment_damage], range(2, 20), quantiles(5));
    marker-fill: #4d78ee;
    marker-fill-opacity: 0.3;
    marker-allow-overlap: true;
    marker-line-width: 1;
    marker-line-color: #FFFFFF;
    marker-line-opacity: 1;
    marker-comp-op: screen;
  }`

  const backgroundFinal = `as-panel__element as-p--32 ${background}`

  return (
    <div className="as-map-panels" data-name={name}>
      <div className={position}>
        <div className={backgroundFinal}>
          <LayerToggle
            layer={layers.railaccidents}
          />
          <StyleToggle
            layer={layers.railaccidents}
            name='Change Points Style'
            cartocss={cartocss}
          />
        </div>
      </div>
    </div>

  )
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

export default connect(mapStateToProps)(Panel);
