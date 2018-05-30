import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Widget, Tabs, Avatar } from '@carto/airship'
import SpendChart from './SpendChart'
import { getFocusedTab } from '../actions/mapsettings';

// <Avatar url="../../public/mc.png" size={36} />

class SpendAmount extends Component {

  render() {
    return (
      <div>
        <Widget>
          <Widget.Title>Spend</Widget.Title>
            <Widget.Description>Total spend</Widget.Description>
              <Tabs selected={this.props.focusedTab}>
                <Tabs.Panel label="4 Minutes">
                  <SpendChart
                    minutes={'4 min.'}
                    column={'index_weighted_spend_amt'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="8 Minutes">
                  <SpendChart
                    minutes={'8 min.'}
                    column={'index_weighted_spend_amt'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="12 Minutes">
                  <SpendChart
                    minutes={'12 min.'}
                    column={'index_weighted_spend_amt'}
                  />
                </Tabs.Panel>
              </Tabs>
          </Widget>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  analyzedStore: state.mapsettings.analyzedStore,
  focusedTab: state.mapsettings.focusedTab
});

const mapDispatchToProps = (dispatch) => ({
    getFocusedTab: (tab) => dispatch(getFocusedTab(tab))
})

export default connect(mapStateToProps, mapDispatchToProps)(SpendAmount);
