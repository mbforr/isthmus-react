import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import POICat from './POICat'
import NearestPOIs from './NearestPOIs'
import { Widget } from '@carto/airship'


class POI extends Component {

  render() {
    return (
      <div className="demographics">
        <POICat />
        <Widget className="demographics__two">
          <Widget.Title>Nearest Points of Interest</Widget.Title>
            <Widget.Description>Nearest points of interest to location</Widget.Description>
              <NearestPOIs />
        </Widget>
      </div>
    )
  }
}

export default POI;
