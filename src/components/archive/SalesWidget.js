import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Widget, Subheader } from '@carto/airship'

class IncomeWidget extends React.Component {
  state = {
    array: []
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
  const q = `https://mforrest.carto.com/api/v2/sql?q=
  WITH a AS
  (SELECT
   warby_atl_drive.the_geom,
   warby_atl_drive.source_cartodb_id,
   warby_atl_drive.minutes,
   warby_atl_drive.data_range,
   to_char(sum(warby_parker_morans_orders.${this.props.column}), '999,999,999,999') as value
   FROM warby_parker_morans_orders, warby_atl_drive
   WHERE ST_Intersects(warby_parker_morans_orders.the_geom, warby_atl_drive.the_geom)
   GROUP BY 1, 2, 3, 4 ORDER BY warby_atl_drive.data_range asc)
   SELECT concat(a.minutes, ' - ${this.props.prefix}', a.value, ' ${this.props.suffix}') as value FROM a
   WHERE a.source_cartodb_id = ${id}
 &api_key=665b6d21a3b9c20906057414b7da378b519df141`
  axios.get(q)
    .then(res => {
      array = res.data.rows;
      this.setState({ array: array });
    })
}

render()
  {
    return (
      <div>
        <Widget>
          <Widget.Title>Median Income</Widget.Title>
            <Widget.Description>Median income within the last 12 months</Widget.Description>
              { this.state.array.map(array => <Subheader as="p" key={array.value}>{array.value}</Subheader>)}
        </Widget>
      </div>
    )
  }
}





const mapStateToProps = (state) => ({
  analyzedStore: state.mapsettings.analyzedStore
});

export default connect(mapStateToProps)(IncomeWidget);
