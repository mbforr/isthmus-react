import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Subheader, CategoryWidget } from '@carto/airship'

class POICategory extends React.Component {
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
  SELECT count(*) as value, initcap(REPLACE(amenity, '_', ' ')) as name FROM mforrest.export_4
  WHERE EXISTS (SELECT * FROM warby_atl_drive WHERE ST_Intersects(export_4.the_geom, warby_atl_drive.the_geom) AND warby_atl_drive.source_cartodb_id = ${id} and warby_atl_drive.minutes = '${this.props.minutes}')
  group by 2 order by 1 desc
  LIMIT 12
  &api_key=665b6d21a3b9c20906057414b7da378b519df141`
  axios.get(q)
    .then(res => {
      array = res.data.rows;
      max = res.data.rows[0].value
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

export default connect(mapStateToProps)(POICategory);
