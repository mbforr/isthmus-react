import React from 'react';
import PropTypes from 'prop-types';

const InfoWindow = ({ railroad, cause, weather, accident_type, image, city }) => (
  <as-infowindow src={image}>
    <h1 className="as-title">{city}</h1>
    <p>
    <span className="as-badge">{accident_type}</span>
    </p>
    <br />
    <p className="as-caption">{cause}</p>
    <br />
    <h4 className="as-subheader">Company</h4>
    <p className="as-body">{railroad}</p>
    <br />
    <h4 className="as-subheader">Weather</h4>
    <p className="as-body">{weather}</p>
</as-infowindow>
);

export default InfoWindow;
