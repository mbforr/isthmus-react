import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import carto from 'carto.js';
import { connect } from 'react-redux';
import SiteAnalysis from './SiteAnalysis'
import { Tabs, Widget } from '@carto/airship'
import Demographics from './Demographics'
import Spend from './Spend'
import Sales from './Sales'
import Traffic from './Traffic'
import POI from './POI'

class BottomBar extends Component {

cartoClient = new carto.Client({ apiKey: '665b6d21a3b9c20906057414b7da378b519df141', username: 'mforrest'});

  render() {
    return (
      <div className="bottombar">
        <div className="bottombar__pad">
          <h1>Site Details</h1>
            <Tabs selected={0}>
            <Tabs.Panel label="Demographics">
              <Demographics />
            </Tabs.Panel>
            <Tabs.Panel label="Spend">
              <Spend />
            </Tabs.Panel>
            <Tabs.Panel label="Sales">
              <Sales />
            </Tabs.Panel>
            <Tabs.Panel label="Mobility">
              <Widget className="demographics__one">
                <Widget.Title>Mobility Data</Widget.Title>
                <Widget.Description>Mobility data includes average foot traffic counts from mobile phone location data broken down by hour and day of week - coming soon.</Widget.Description>
              </Widget>
            </Tabs.Panel>
            <Tabs.Panel label="Traffic">
              <Traffic />
            </Tabs.Panel>
            <Tabs.Panel label="Points of Interest">
              <POI />
            </Tabs.Panel>
            <Tabs.Panel label="Weather">
              <Widget className="demographics__one">
                <Widget.Title>Weather Data</Widget.Title>
                <Widget.Description>Weather data includes 10 day forceast, historical and deviation from normal, current weather, and more - available now.</Widget.Description>
              </Widget>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default BottomBar;
