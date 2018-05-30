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
  const q = `https://mforrest.carto.com/api/v2/sql?q=SELECT concat(minutes, ' - $', to_char(round(OBS_GetMeasure(the_geom, 'us.census.acs.B19013001', 'predenominated','us.census.tiger.block_group', '2011 - 2015')), '999,999,999,999'), ' median income') as median_income FROM warby_atl_drive WHERE source_cartodb_id = ${id}&api_key=665b6d21a3b9c20906057414b7da378b519df141`
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
              { this.state.array.map(array => <Subheader as="p" key={array.median_income}>{array.median_income}</Subheader>)}
        </Widget>
      </div>
    )
  }
}





const mapStateToProps = (state) => ({
  analyzedStore: state.mapsettings.analyzedStore
});

export default connect(mapStateToProps)(IncomeWidget);
