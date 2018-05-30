import React, { Component } from 'react';
import { render } from 'react-dom';
import carto from 'carto.js';
import { connect } from 'react-redux';
import SiteAnalysis from './SiteAnalysis'


class RightBar extends Component {

  cartoClient = new carto.Client({ apiKey: '665b6d21a3b9c20906057414b7da378b519df141', username: 'mforrest'});

  render() {
    return (
      <div className="rightbar">
        <h1>Analyze</h1>
        <SiteAnalysis />
      </div>

    )
  }
}

export default RightBar;
