import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Widget, StackedBar, Histogram } from '@carto/airship'

class PopPyramid extends React.Component {
  state = {
    data: []
  }

componentWillReceiveProps(nextProps) {
  if ( nextProps.analyzedStore !== this.props.analyzedStore ) {
    this.updateArray(nextProps.analyzedStore)
  }
}

componentDidMount() {
  const id = this.props.analyzedStore
  this.updateArray(id)
}

updateArray(id) {
  let data = []
  const dQuery = `https://mforrest.carto.com/api/v2/sql?q=
  select
  unnest(array['under5', 'pop_5_9', 'pop_10_14', 'pop_15_17', 'pop_18_19', 'pop_20', 'pop_21', 'pop_22_24', 'pop_25_29', 'pop_30_34', 'pop_35_39', 'pop_40_44', 'pop_45_49', 'pop_50_54', 'pop_55_59', 'pop_60_61', 'pop_62_64', 'pop_65_66', 'pop_67_69', 'pop_70_74', 'pop_75_79', 'pop_80_84', 'pop_85over']) as name,
  unnest(array[
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001027', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001028', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001029', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001030', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001031', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001032', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001033', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001034', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001035', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001036', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001037', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001038', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001039', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001040', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001041', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001042', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001043', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001044', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001045', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001046', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001047', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001048', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001049', 'predenominated','us.census.tiger.block_group', '2011 - 2015')]) as female,
  unnest(array[
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001003', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001004', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001005', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001006', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001007', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001008', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001009', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001010', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001011', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001012', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001013', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001014', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001015', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001016', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001017', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001018', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001019', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001020', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001021', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001022', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001023', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001024', 'predenominated','us.census.tiger.block_group', '2011 - 2015'),
  OBS_GetMeasure(the_geom, 'us.census.acs.B01001025', 'predenominated','us.census.tiger.block_group', '2011 - 2015')]) as male
  FROM mforrest.warby_atl_drive
  WHERE source_cartodb_id = ${id}
  AND minutes = '${this.props.minutes}'
  &api_key=665b6d21a3b9c20906057414b7da378b519df141`
  axios.get(dQuery)
    .then(res => {
      data = res.data.rows;
      this.setState({ data: data });
      console.log(this.state.data)
    })
}

render()
  {
    return (
          <StackedBar
            data={this.state.data}
            keys={['female', 'male']}
          />
    )
  }
}

const mapStateToProps = (state) => ({
  analyzedStore: state.mapsettings.analyzedStore
});

export default connect(mapStateToProps)(PopPyramid);
