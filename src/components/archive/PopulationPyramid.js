import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Widget, StackedBar, Tabs } from '@carto/airship'
import PopPyramid from './PopPyramid'
import { getFocusedTab } from '../actions/mapsettings';

class PopulationPyramid extends Component {

  render() {
    return (
      <div>
        <Widget>
          <Widget.Title>Population Pyramid</Widget.Title>
            <Widget.Description>Ages and Gender</Widget.Description>
              <Tabs selected={this.props.focusedTab}>
                <Tabs.Panel label="4 Minutes">
                  <PopPyramid
                    minutes={'4 min.'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="8 Minutes">
                  <PopPyramid
                    minutes={'8 min.'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="12 Minutes">
                  <PopPyramid
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

export default connect(mapStateToProps, mapDispatchToProps)(PopulationPyramid);
