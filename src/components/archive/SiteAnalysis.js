import React, { Component } from 'react';
import carto from 'carto.js';
import { connect } from 'react-redux';
import { analyzedStore, getTargetStore } from '../actions/mapsettings';
import Title from './Title'
import SideHeader from './SideHeader'

class SiteAnalysis extends Component {

  cartoClient = new carto.Client({ apiKey: '665b6d21a3b9c20906057414b7da378b519df141', username: 'mforrest'});

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <Title
          analyzedStore={this.props.analyzedStore}
        />
      <SideHeader
        title={'Demographics'}
        query={`SELECT concat(minutes, ' - ', to_char(round(OBS_GetMeasure(the_geom, 'us.census.acs.B01003001', 'predenominated','us.census.tiger.block_group', '2011 - 2015')), '999,999,999,999'), ' people') as total_pop FROM warby_atl_drive`}
        target={this.props.analyzedStore}
      />
      <SideHeader
        title={'Sales'}
        query={`WITH a AS ( SELECT warby_atl_drive.the_geom, warby_atl_drive.source_cartodb_id, warby_atl_drive.minutes, warby_atl_drive.data_range, to_char(sum(warby_parker_morans_orders.o_2017_r), '999,999,999,999') as total_pop FROM warby_parker_morans_orders, warby_atl_drive WHERE ST_Intersects(warby_parker_morans_orders.the_geom, warby_atl_drive.the_geom) GROUP BY 1, 2, 3, 4 ORDER BY warby_atl_drive.data_range asc) SELECT concat(a.minutes, ' - ', a.total_pop, ' orders') as total_pop FROM a`}
        target={this.props.analyzedStore}
      />
      <SideHeader
        title={'Target Market'}
        query={`WITH a AS ( SELECT warby_atl_drive.the_geom, warby_atl_drive.source_cartodb_id, warby_atl_drive.minutes, warby_atl_drive.data_range, to_char(sum(warby_parker_morans_orders.t_market), '999,999,999,999') as total_pop FROM warby_parker_morans_orders, warby_atl_drive WHERE ST_Intersects(warby_parker_morans_orders.the_geom, warby_atl_drive.the_geom) GROUP BY 1, 2, 3, 4 ORDER BY warby_atl_drive.data_range asc) SELECT concat(a.minutes, ' - ', a.total_pop, ' target market') as total_pop FROM a`}
        target={this.props.analyzedStore}
      />
      <SideHeader
        title={'Spend Index'}
        query={`WITH a AS ( SELECT warby_atl_drive.the_geom, warby_atl_drive.source_cartodb_id, warby_atl_drive.minutes, warby_atl_drive.data_range, to_char(avg(geogrid_atl.index_weighted_spend_amt), '999,999,999,999.99') as total_pop FROM geogrid_atl, warby_atl_drive WHERE ST_Intersects(geogrid_atl.the_geom, warby_atl_drive.the_geom) GROUP BY 1, 2, 3, 4 ORDER BY warby_atl_drive.data_range asc) SELECT concat(a.minutes, ' - ', a.total_pop, ' average spend index') as total_pop FROM a`}
        target={this.props.analyzedStore}
      />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  analyzedStore: state.mapsettings.analyzedStore
});

export default connect(mapStateToProps)(SiteAnalysis);
