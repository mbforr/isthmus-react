import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import LayerToggle from '../widgets/LayerToggle'
import '@carto/airship-style';

class IconBadge extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
  }

  render() {
    const { name, text, color, icon } = this.props;
    const badgeClass = `as-badge as-bg--badge-${color} ${text}`

    return (
      <div className="as-p--8">
        <span className={badgeClass}><i className={icon}></i><p>{name}</p></span>
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

export default connect(mapStateToProps, mapDispatchToProps)(IconBadge);
