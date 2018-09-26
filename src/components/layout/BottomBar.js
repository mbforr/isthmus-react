import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../../actions/actions';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import '@carto/airship-style';
import Formula from '../widgets/Formula'

class BottomBar extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
  }

  render() {

    const background = `as-map-footer ${this.props.background}`

    return (
      <footer className={background} data-name={this.props.name}>
        <div className="as-container as-container--scrollable">
          <section className="as-box as-box--large">
            <Formula
              title='Total Damage'
              description='Maximum total damage in USD for accidents in view'
              round={true}
              currency={true}
              layer={this.props.layers.railaccidents.source}
              column='total_damage'
              operation={carto.operation.MAX}
            />
          </section>
        </div>
      </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
