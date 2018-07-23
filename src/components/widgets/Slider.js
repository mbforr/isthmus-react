import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';
import { Display, Range, Text } from '@carto/airship'
import Widget from './Widget';
import C from '../../data/C'
import { setPriceFilter } from '../../actions/actions';
import { formatPrice, debounce } from '../../data/utils';

const QUERY = `
  SELECT
    min(total_damage),
    max(total_damage)
  FROM rail_accidents
`;

const { BASEMAP, BASEMAP_LABELS, CENTER, ZOOM, SQL_API_URL, API_KEY } = C;

class Slider extends Component {

  state = {
    result: 0,
    range: {}
  }

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }

  }
  componentWillMount() {
    fetch(`${SQL_API_URL}${QUERY.trim()}&api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.rows[0])
        const { min, max } = data.rows[0];
        console.log(max)
        this.setState({ min, max })
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {

    //const { client, layers } = props;
    const { source } = this.props.layer;

    //const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.props.map);

    this.dataView = new carto.dataview.Formula(source, 'total_damage', { operation: carto.operation.AVG });
    this.dataView.addFilter(bboxFilter);
    this.dataView.on('dataChanged', this.onDataChanged);

    client.addDataview(this.dataView);
  }

  componentDidUpdate(prevProps) {
    const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.props.map)
  }

  // componentWillUnmount() {
  //   this.dataView.off('dataChanged');
  // }

  onDataChanged = (data) => {
    this.setState(data);
  }

  onRangeChanged = ({ min, max }) => {
    this.setState({ min, max });
    this.props.setPriceFilter({ min, max })
  }

  render() {
    const { min, max, range, result } = this.state;

    return (
      <Widget>
        <Widget.Title>this.props.title</Widget.Title>
        <Widget.Description>this.props.description</Widget.Description>

        <Display>{formatPrice(result)}</Display>

        {(range.min || range.max) && (
          <React.Fragment>
            <Text margin="0 0 0.5rem">Filter by price:</Text>
            <Range
              draggable
              value={{ min, max }}
              minValue={range.min}
              maxValue={range.max}
              onChange={debounce(this.onRangeChanged)}
              formatLabel={(value) => `$${total_damage}`}
            />
          </React.Fragment>
        )}
        <br/>
      </Widget>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  filters: state.filters,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

const mapDispatchToProps = dispatch => ({
  setPriceFilter: filter => dispatch(setPriceFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
