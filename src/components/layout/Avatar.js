import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import '@carto/airship-style';

class Avatar extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
  }

  state = {
    size: null
  };

  componentDidMount() {
    const { size } = this.props;
    let avatarSize
    if (size === 'l' || size === 'xl') {
      avatarSize = `as-avatar as-avatar--${size}`
    } else {
      avatarSize = `as-avatar`
    }


    this.setState({ size: avatarSize })
  }

  render() {

    const { alt, icon } = this.props;

    return (
      <img
        className={this.state.size}
        src={icon}
        alt={alt}
      >
      </img>
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

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
