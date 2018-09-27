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

    return (
      <div className="as-p--16">
        <input
          className="as-input"
          id={id}
          type="text"
          placeholder={this.props.placeholder}
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
