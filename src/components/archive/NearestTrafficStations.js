import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Widget, Histogram, Table } from '@carto/airship'

class NearestTrafficStations extends React.Component {
  state = {
    row1: [],
    row2: [],
    row3: [],
    row4: [],
    row5: [],
    row6: [],
    row7: [],
    row8: [],
    row9: [],
    row10: []
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
  let row1 = []
  let row2 = []
  let row3 = []
  let row4 = []
  let row5 = []
  let row6 = []
  let row7 = []
  let row8 = []
  let row9 = []
  let row10 = []
  const mQuery = encodeURI(`https://mforrest.carto.com/api/v2/sql?q=
  WITH
  c as (
  select row_number() over() as cartodb_id,
    annualized_statistics.the_geom,
    annualized_statistics.station_id,
    annualized_statistics.aadt,
    t.cartodb_id as store_id,
    t.ranking as closest_rank,
    ST_Distance(geography(t.the_geom), geography(annualized_statistics.the_geom))/1609 as closest_dist_miles
  FROM annualized_statistics
  CROSS JOIN LATERAL (
  SELECT * FROM (
    SELECT *, row_number() over(ORDER BY annualized_statistics.the_geom <-> the_geom) AS ranking FROM warby_parker_locations_sheet1_1 WHERE warby_parker_locations_sheet1_1.cartodb_id = ${id}) AS ranked
  ) AS t)
  SELECT station_id, to_char(aadt, '999,999,999,999') as aadt, round(closest_dist_miles::numeric,2) as closest_dist_miles from c
  order by closest_dist_miles
  limit 10
  &api_key=665b6d21a3b9c20906057414b7da378b519df141`)
  axios.get(mQuery)
    .then(res => {
      row1 = res.data.rows[0];
      row2 = res.data.rows[1];
      row3 = res.data.rows[2];
      row4 = res.data.rows[3];
      row5 = res.data.rows[4];
      row6 = res.data.rows[5];
      row7 = res.data.rows[6];
      row8 = res.data.rows[7];
      row9 = res.data.rows[8];
      row10 = res.data.rows[9];
      console.log(row8)
      this.setState({ row1: row1,
        row2: row2,
        row3: row3,
        row4: row4,
        row5: row5,
        row6: row6,
        row7: row7,
        row8: row8,
        row9: row9,
        row10: row10 });
    })
}

render()
  {
    return (
      <div>
          <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Station ID</Table.HeaderCell>
              <Table.HeaderCell>Average Daily Traffic Count</Table.HeaderCell>
              <Table.HeaderCell>Distance (mi.)</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>ID: {this.state.row1.station_id}</Table.Cell>
              <Table.Cell>{this.state.row1.aadt} daily cars</Table.Cell>
              <Table.Cell>{this.state.row1.closest_dist_miles} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ID: {this.state.row2.station_id}</Table.Cell>
              <Table.Cell>{this.state.row2.aadt} daily cars</Table.Cell>
              <Table.Cell>{this.state.row2.closest_dist_miles} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ID: {this.state.row3.station_id}</Table.Cell>
              <Table.Cell>{this.state.row3.aadt} daily cars</Table.Cell>
              <Table.Cell>{this.state.row3.closest_dist_miles} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ID: {this.state.row4.station_id}</Table.Cell>
              <Table.Cell>{this.state.row4.aadt} daily cars</Table.Cell>
              <Table.Cell>{this.state.row4.closest_dist_miles} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ID: {this.state.row5.station_id}</Table.Cell>
              <Table.Cell>{this.state.row5.aadt} daily cars</Table.Cell>
              <Table.Cell>{this.state.row5.closest_dist_miles} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ID: {this.state.row6.station_id}</Table.Cell>
              <Table.Cell>{this.state.row6.aadt} daily cars</Table.Cell>
              <Table.Cell>{this.state.row6.closest_dist_miles} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ID: {this.state.row7.station_id}</Table.Cell>
              <Table.Cell>{this.state.row7.aadt} daily cars</Table.Cell>
              <Table.Cell>{this.state.row7.closest_dist_miles} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ID: {this.state.row8.station_id}</Table.Cell>
              <Table.Cell>{this.state.row8.aadt} daily cars</Table.Cell>
              <Table.Cell>{this.state.row8.closest_dist_miles} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ID: {this.state.row9.station_id}</Table.Cell>
              <Table.Cell>{this.state.row9.aadt} daily cars</Table.Cell>
              <Table.Cell>{this.state.row9.closest_dist_miles} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ID: {this.state.row10.station_id}</Table.Cell>
              <Table.Cell>{this.state.row10.aadt} daily cars</Table.Cell>
              <Table.Cell>{this.state.row10.closest_dist_miles} mi. away</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  analyzedStore: state.mapsettings.analyzedStore
});

export default connect(mapStateToProps)(NearestTrafficStations);
