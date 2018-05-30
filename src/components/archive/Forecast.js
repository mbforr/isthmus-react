import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Widget, Histogram, Table } from '@carto/airship'

class NearestPOIs extends React.Component {
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
  const mQuery = encodeURI(`https://api.weathersource.com/v1/b43abd3b41cc8e651cc3/points/40.7047734,-73.9418603/forecast.json`)
  axios.get(mQuery)
    .then(res => {
      row1 = res.data[0];
      row2 = res.data[1];
      row3 = res.data[2];
      row4 = res.data[3];
      row5 = res.data[4];
      row6 = res.data[5];
      row7 = res.data[6];
      row8 = res.data[7];
      row9 = res.data[8];
      row10 = res.data[9];
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
              <Table.HeaderCell>tempMin</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Distance (mi.)</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{this.state.row1.tempMin}</Table.Cell>
              <Table.Cell>{this.state.row1.tempMax}</Table.Cell>
              <Table.Cell>{this.state.row1.precip} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.row2.tempMin}</Table.Cell>
              <Table.Cell>{this.state.row2.tempMax}</Table.Cell>
              <Table.Cell>{this.state.row2.precip} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.row3.tempMin}</Table.Cell>
              <Table.Cell>{this.state.row3.tempMax}</Table.Cell>
              <Table.Cell>{this.state.row3.precip} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.row4.tempMin}</Table.Cell>
              <Table.Cell>{this.state.row4.tempMax}</Table.Cell>
              <Table.Cell>{this.state.row4.precip} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.row5.tempMin}</Table.Cell>
              <Table.Cell>{this.state.row5.tempMax}</Table.Cell>
              <Table.Cell>{this.state.row5.precip} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.row6.tempMin}</Table.Cell>
              <Table.Cell>{this.state.row6.tempMax}</Table.Cell>
              <Table.Cell>{this.state.row6.precip} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.row7.tempMin}</Table.Cell>
              <Table.Cell>{this.state.row7.tempMax}</Table.Cell>
              <Table.Cell>{this.state.row7.precip} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.row8.tempMin}</Table.Cell>
              <Table.Cell>{this.state.row8.tempMax}</Table.Cell>
              <Table.Cell>{this.state.row8.precip} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.row9.tempMin}</Table.Cell>
              <Table.Cell>{this.state.row9.tempMax}</Table.Cell>
              <Table.Cell>{this.state.row9.precip} mi. away</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.row10.tempMin}</Table.Cell>
              <Table.Cell>{this.state.row10.tempMax}</Table.Cell>
              <Table.Cell>{this.state.row10.precip} mi. away</Table.Cell>
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

export default connect(mapStateToProps)(NearestPOIs);
