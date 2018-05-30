import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Widget, StackedBar, Tabs } from '@carto/airship'
import POICategory from './POICategory'
import { getFocusedTab } from '../actions/mapsettings';


class POICat extends Component {

  render() {
    return (
      <div>
        <Widget>
          <Widget.Title>Detailed Segments</Widget.Title>
            <Widget.Description>Detailed population segments</Widget.Description>
              <Tabs selected={this.props.focusedTab}>
                <Tabs.Panel label="4 Minutes">
                  <POICategory
                    minutes={'4 min.'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="8 Minutes">
                  <POICategory
                    minutes={'8 min.'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="12 Minutes">
                  <POICategory
                    minutes={'12 min.'}
                  />
                </Tabs.Panel>
              </Tabs>
          </Widget>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  analyzedStore: state.mapsettings.analyzedStore,
  focusedTab: state.mapsettings.focusedTab
});

const mapDispatchToProps = (dispatch) => ({
    getFocusedTab: (tab) => dispatch(getFocusedTab(tab))
})

export default connect(mapStateToProps, mapDispatchToProps)(POICat);
