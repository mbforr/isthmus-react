import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import '@carto/airship-style';

class HeaderLink extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
  }

  render() {

    const { link, name } = this.props;

    return (
      <li className="as-toolbar__item">
        <a href={link}>{name}</a>
      </li>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLink);
