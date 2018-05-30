import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Widget, Histogram, Table } from '@carto/airship'

class TrafficChart extends React.Component {
  state = {
    inarea: [],
    total: []
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
  let inarea = []
  let total = []
  const mQuery = `https://mforrest.carto.com/api/v2/sql?q=
  WITH inarea as
  (SELECT
  max(round(${this.props.column})),
  min(round(${this.props.column})),
  round(avg(${this.props.column})) as avg
  FROM annualized_statistics
  WHERE EXISTS
  (SELECT *
  FROM warby_atl_drive
  WHERE ST_Intersects(annualized_statistics.the_geom, warby_atl_drive.the_geom)
  AND warby_atl_drive.source_cartodb_id = ${id} AND warby_atl_drive.minutes =$$${this.props.minutes}$$)),

  entire_area AS (
  SELECT
  max(round(${this.props.column})),
  min(round(${this.props.column})),
  round(avg(${this.props.column})) as avg
  FROM
  annualized_statistics)

  select *, $$In Area$$ as name from inarea
  union
  select *, $$Entire Area$$ as name from entire_area

  &api_key=665b6d21a3b9c20906057414b7da378b519df141`
  axios.get(mQuery)
    .then(res => {
      inarea = res.data.rows[0];
      total = res.data.rows[1];
      this.setState({ inarea: inarea, total: total });
      console.log(this.state.inarea)
    })
}

render()
  {
    return (
      <div>
          <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Within {this.props.minutes}</Table.HeaderCell>
              <Table.HeaderCell>Entire Area</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Max: {this.state.inarea.max}</Table.Cell>
              <Table.Cell>Max: {this.state.total.max}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Min: {this.state.inarea.min}</Table.Cell>
              <Table.Cell>Min: {this.state.total.min}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Avg: {this.state.inarea.avg}</Table.Cell>
              <Table.Cell>Avg: {this.state.total.avg}</Table.Cell>
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

export default connect(mapStateToProps)(TrafficChart);
