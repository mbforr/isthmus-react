import React from 'react';
import PropTypes from 'prop-types';

const InfoWindow = ({ railroad, cause, weather, accident_type, image, city }) => (
  <as-infowindow src={image}>
    <h1 class="as-title">{city}</h1>
    <p>
    <span class="as-badge">{accident_type}</span>
    </p>
    <br />
    <p class="as-caption">{cause}</p>
    <br />
    <h4 className="as-subheader">Company</h4>
    <p class="as-body">{railroad}</p>
    <br />
    <h4 className="as-subheader">Weather</h4>
    <p class="as-body">{weather}</p>
</as-infowindow>
);

export default InfoWindow;
