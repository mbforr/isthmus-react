import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import LayerToggle from '../widgets/LayerToggle'
import '@carto/airship-style';

class InputButton extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
  }

  state = {
    button: null
  };

  componentDidMount() {
    const { type, size } = this.props;
    let t
    let s

    if (size === 'large') {
      s = 'as-btn--l'
    } else if (size === 'small') {
      s = 'as-btn--s'
    } else {
      s = ''
    }

    if (type === 'primary') {
      t = 'as-btn--primary'
    } else if (type === 'secondary') {
      t = 'as-btn--secondary'
    } else {
      t = ''
    }

    const button = `as-btn ${t} ${s}`

    this.setState({ button: button })
  }

  render() {

    return (
      <div className="as-p--16">
        <input type="button" value={this.props.name} className={this.state.button} />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(InputButton);
