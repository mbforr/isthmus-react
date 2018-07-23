import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Text } from '@carto/airship';

const InfoWindow = ({ railroad, cause, weather, accident_type, image }) => (
  <Popup image={image}>
    <Text color="#747474">Company</Text>
    <Text margin="0 0 1rem">{railroad}</Text>

    <Text color="#747474">Cause</Text>
    <Text margin="0 0 1rem">{cause}</Text>

    <Text color="#747474">Weather</Text>
    <Text margin="0 0 1rem">{weather}</Text>

    <Text color="#747474">Accident Type</Text>
    <Text margin="0 0 1rem">{accident_type}</Text>
  </Popup>
);

export default InfoWindow;
