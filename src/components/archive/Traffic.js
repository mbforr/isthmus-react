import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TrafficChart from './TrafficChart'
import NearestTrafficStations from './NearestTrafficStations'
import { Widget, Tabs } from '@carto/airship'

class Traffic extends Component {

  render() {
    return (
      <div className="demographics">
        <Widget className="demographics__one">
          <Widget.Title>Traffic</Widget.Title>
            <Widget.Description>Traffic counts from nearby GDOT monitoring stations</Widget.Description>
              <Tabs selected={this.props.focusedTab}>
                <Tabs.Panel label="4 Minutes">
                  <TrafficChart
                    minutes={'4 min.'}
                    column={'aadt'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="8 Minutes">
                  <TrafficChart
                    minutes={'8 min.'}
                    column={'aadt'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="12 Minutes">
                  <TrafficChart
                    minutes={'12 min.'}
                    column={'aadt'}
                  />
                </Tabs.Panel>
              </Tabs>
          </Widget>
          <Widget className="demographics__two">
            <Widget.Title>Nearest Stations</Widget.Title>
              <Widget.Description>Traffic counts from nearest traffic count stations</Widget.Description>
              <NearestTrafficStations />
          </Widget>
      </div>
    )
  }
}

export default Traffic;
