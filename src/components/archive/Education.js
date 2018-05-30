import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Widget, StackedBar, Tabs } from '@carto/airship'
import EducationWidget from './EducationWidget'
import { getFocusedTab } from '../actions/mapsettings';

// getTab = (tab) => {
//   tab ? this.props.getFocusedTab(tab) : this.props.getFocusedTab(0)
// }

class Education extends Component {

  render() {
    return (
      <div>
        <Widget>
          <Widget.Title>Education</Widget.Title>
            <Widget.Description>Educational attainment</Widget.Description>
              <Tabs
                selected={this.props.focusedTab}
              >
                <Tabs.Panel label="4 Minutes">
                  <EducationWidget
                    minutes={'4 min.'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="8 Minutes">
                  <EducationWidget
                    minutes={'8 min.'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="12 Minutes">
                  <EducationWidget
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

export default connect(mapStateToProps, mapDispatchToProps)(Education);
