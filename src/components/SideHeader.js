import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class SideHeader extends React.Component {
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
  const q = `https://mforrest.carto.com/api/v2/sql?q=${this.props.query} WHERE source_cartodb_id = ${id}&api_key=665b6d21a3b9c20906057414b7da378b519df141`
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
        <h1>{this.props.title}</h1>
        { this.state.array.map(array => <p key={array.total_pop}>{array.total_pop}</p>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  analyzedStore: state.mapsettings.analyzedStore
});

export default connect(mapStateToProps)(SideHeader);
