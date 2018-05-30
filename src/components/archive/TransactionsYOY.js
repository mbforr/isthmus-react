import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Widget, StackedBar, Tabs } from '@carto/airship'
import SpendChart from './SpendChart'
import { getFocusedTab } from '../actions/mapsettings';

class TransactionsYOY extends Component {

  render() {
    return (
      <div>
        <Widget>
          <Widget.Title>Transactions Year over Year</Widget.Title>
            <Widget.Description>Transactions year over year spend</Widget.Description>
              <Tabs selected={this.props.focusedTab}>
                <Tabs.Panel label="4 Minutes">
                  <SpendChart
                    minutes={'4 min.'}
                    column={'weighted_trans_cnt_yoy'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="8 Minutes">
                  <SpendChart
                    minutes={'8 min.'}
                    column={'weighted_trans_cnt_yoy'}
                  />
                </Tabs.Panel>
                <Tabs.Panel label="12 Minutes">
                  <SpendChart
                    minutes={'12 min.'}
                    column={'weighted_trans_cnt_yoy'}
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsYOY);
