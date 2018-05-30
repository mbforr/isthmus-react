import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Widget, StackedBar, Tabs } from '@carto/airship'
import SegmentsWidget from './SegmentsWidget'
import { getFocusedTab } from '../actions/mapsettings';


class Segments extends Component {

  render() {
    return (
      <div>
        <Widget>
          <Widget.Title>Segments</Widget.Title>
            <Widget.Description>Population segments</Widget.Description>
              <Tabs selected={this.props.focusedTab}>
                <Tabs.Panel label="4 Minutes">
                  <SegmentsWidget
                    minutes={'4 min.'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="8 Minutes">
                  <SegmentsWidget
                    minutes={'8 min.'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="12 Minutes">
                  <SegmentsWidget
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

export default connect(mapStateToProps, mapDispatchToProps)(Segments);
