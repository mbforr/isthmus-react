import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import SalesWidget from './SalesWidget'
import { Widget } from '@carto/airship'


class Sales extends Component {

  render() {
    return (
      <div className="demographics">
        <Widget className="demographics__one">
          <Widget.Title>2016 Orders</Widget.Title>
            <Widget.Description>Total orders in 2016</Widget.Description>
              <SalesWidget
                prefix={''}
                suffix={'orders'}
                column={'o_2016'}
              />
          </Widget>
          <Widget className="demographics__one">
            <Widget.Title>2016 Order Value</Widget.Title>
              <Widget.Description>Total orders in 2016</Widget.Description>
                <SalesWidget
                  prefix={'$'}
                  suffix={'est. value'}
                  column={'o_2016 * 180'}
                />
          </Widget>
          <Widget className="demographics__one">
            <Widget.Title>2017 Orders</Widget.Title>
              <Widget.Description>Total orders in 2016</Widget.Description>
                <SalesWidget
                  prefix={''}
                  suffix={'orders'}
                  column={'o_2017_r'}
                />
          </Widget>
          <Widget className="demographics__one">
            <Widget.Title>2017 Order Value</Widget.Title>
              <Widget.Description>Total orders in 2017</Widget.Description>
                <SalesWidget
                  prefix={'$'}
                  suffix={'est. value'}
                  column={'o_2017_r * 180'}
                />
          </Widget>
      </div>
    )
  }
}

export default Sales;
