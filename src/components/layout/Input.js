import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import '@carto/airship-style';

class Input extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
  }

  render() {

    const { id, required } = this.props;
    let requiredValue
    console.log(required)

    if (required === true) {
      requiredValue = `required`
    } else {
      requiredValue = ``
    }

    console.log(requiredValue)

    return (
      <div className="as-p--16">
        <input
          className="as-input"
          id={id}
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.value}
          ></input>
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

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Input);
