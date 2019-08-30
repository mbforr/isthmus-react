import React from 'react';
import { connect } from 'react-redux';
import '@carto/airship-style';

const HeaderLink = ({ link, name }) => {
    return (
      <li className="as-toolbar__item">
        <a href={link}>{name}</a>
      </li>
    );
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  filters: state.filters,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});


export default connect(mapStateToProps)(HeaderLink);
