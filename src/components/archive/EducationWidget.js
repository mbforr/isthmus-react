import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Subheader, CategoryWidget } from '@carto/airship'

class EducationWidget extends React.Component {
  state = {
    array: [],
    max: 0
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
  let array = []
  let max = []
  const q = `https://mforrest.carto.com/api/v2/sql?q=
  select
  unnest(array['No High School', 'No High Schoool or GED', 'Some College', 'Completed High School', 'Under 1 Year College - No Degree', '1+ Years College - No Degree', 'Associates Degree', 'Bachelors Degree', 'Masters Degree']) as name,
  unnest(array[
    round(OBS_GetMeasure(the_geom, 'us.census.acs.B07009002', 'predenominated','us.census.tiger.place', '2015 - 2015')),
    round(OBS_GetMeasure(the_geom, 'us.census.acs.B07009003', 'predenominated','us.census.tiger.place', '2015 - 2015')),
    round(OBS_GetMeasure(the_geom, 'us.census.acs.B07009004', 'predenominated','us.census.tiger.place', '2015 - 2015')),
    round(OBS_GetMeasure(the_geom, 'us.census.acs.B15003017', 'predenominated','us.census.tiger.place', '2015 - 2015')),
    round(OBS_GetMeasure(the_geom, 'us.census.acs.B15003019', 'predenominated','us.census.tiger.place', '2015 - 2015')),
    round(OBS_GetMeasure(the_geom, 'us.census.acs.B15003020', 'predenominated','us.census.tiger.place', '2015 - 2015')),
    round(OBS_GetMeasure(the_geom, 'us.census.acs.B15003021', 'predenominated','us.census.tiger.place', '2015 - 2015')),
    round(OBS_GetMeasure(the_geom, 'us.census.acs.B15003022', 'predenominated','us.census.tiger.place', '2015 - 2015')),
    round(OBS_GetMeasure(the_geom, 'us.census.acs.B15003023', 'predenominated','us.census.tiger.place', '2015 - 2015'))]) as value
  FROM mforrest.warby_atl_drive
  WHERE source_cartodb_id = ${id}
  AND minutes = '${this.props.minutes}'
  ORDER BY 2 desc
  &api_key=665b6d21a3b9c20906057414b7da378b519df141`
  axios.get(q)
    .then(res => {
      array = res.data.rows;
      max = res.data.rows[0].value
      console.log(max)
      this.setState({ array: array, max: max });
    })
}

render()
  {
    return (
      <div>
        <CategoryWidget categories={this.state.array} max={this.state.max} color="#3AB5F0" />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  analyzedStore: state.mapsettings.analyzedStore
});

export default connect(mapStateToProps)(EducationWidget);
