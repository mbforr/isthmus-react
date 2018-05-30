import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PopulationPyramid from './PopulationPyramid'
import IncomeWidget from './IncomeWidget'
import Education from './Education'
import Segments from './Segments'
import SegmentsDetailed from './SegmentsDetailed'

class Demographics extends Component {

  render() {
    return (
      <div className="demographics">
        <PopulationPyramid className="demographics__one" />
        <IncomeWidget className="demographics__one" />
        <Education className="demographics__one" />
        <Segments className="demographics__one" />
        <SegmentsDetailed className="demographics__one" />
      </div>
    )
  }
}

export default Demographics;
