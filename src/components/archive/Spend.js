import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import SpendAmount from './SpendAmount'
import TransactionCount from './TransactionCount'
import AccountCount from './AccountCount'
import TicketSize from './TicketSize'
import AverageFrequency from './AverageFrequency'
import AverageAccountSpend from './AverageAccountSpend'
import SpendYOY from './SpendYOY'
import TransactionsYOY from './TransactionsYOY'
import { Avatar } from '@carto/airship'

class Spend extends Component {

  render() {
    return (
      <div className="demographics">
        <SpendAmount className="demographics__one" />
        <TransactionCount className="demographics__one" />
        <AccountCount className="demographics__one" />
        <TicketSize className="demographics__one" />
        <AverageFrequency className="demographics__one" />
        <AverageAccountSpend className="demographics__one" />
        <SpendYOY className="demographics__one" />
        <TransactionsYOY className="demographics__one" />
      </div>
    )
  }
}

export default Spend;
