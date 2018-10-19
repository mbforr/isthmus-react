import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';

class Dropdown extends Component {

  static defaultProps = {
    showHeader: true,
    showClearButton: true,
    useTotalPercentage: false,
    visibleCategories: Infinity,
  };

  state = {
    options: [
    { text: 'All', value: 'all' },
    { text: 'Open', value: 'open' },
    { text: 'Unfulfilled', value: 'unfulfilled' },
    { text: 'Unpaid', value: 'unpaid' }
    ],
    selection: [],
    filter: null
  };


  componentDidMount() {
    this.setupDropdown();
  }
 //
 //  // componentDidUpdate() {
 //  //   this._setupConfig();
 //  // }
 //
 //  componentDidUpdate(prevProps) {
 //    this._setupConfig();
 //    const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.props.map)
 //    // this.dataView.addFilter(this.props.boundingbox);
 //    // this.dataView.on('dataChanged', this.onDataChanged);
 //
 //    if(prevProps !== this.props) {
 //      this.dataView.addFilter(this.props.boundingbox);
 //    }
 //
 //  }
 //
  setupDropdown() {
    const { options } = this.state;
    this.widget.options = options;
    this.widget.canClear = true
  }
 //  _addDataview() {
 //    this.dataView = new carto.dataview.Category(this.props.categoryLayer, this.props.column, {
 //      limit: 10,
 //      operation: this.props.operation,
 //      operationColumn: this.props.operationColumn
 //    });
 //
 //    this.dataView.on('dataChanged', ({ categories }) => this.setState({ categories }));
 //
 //    this.props.client.addDataview(this.dataView);
 // }
 //
 //  _createFilter() {
 //    const filter = new carto.filter.Category(this.props.column, { in: this.state.selection });
 //    this.props.categoryLayer.addFilter(filter);
 //    this.setState({  filter });
 //  }
 //
 //  _updateFilter() {
 //    this.filter.setFilters({ in: this.state.selection });
 //  }
 //
 //  onSelectedChanged = ({ detail }) => {
 //    let { filter } = this.state;
 //
 //    if (filter && !detail.length) {
 //      this.props.categoryLayer.removeFilter(filter);
 //      filter = null;
 //    }
 //
 //    this.setState({ selection: detail, filter });
 //  }
 //
 //  onApplySelection = () => {
 //    const { filter, selection } = this.state;
 //
 //    selection.length > 0 && !filter
 //      ? this._createFilter()
 //      : this._updateFilter();
 //  }
 //
 //  _onSelectedChanged(event) {
 //    const { onSelectedChanged } = this;
 //    onSelectedChanged && onSelectedChanged(event);
 //  }
 //
 //  _setupEvents() {
 //    this.widget.addEventListener('categoriesSelected', event => this._onSelectedChanged(event));
 //  }


  render() {
    // const { title, description } = this.props;
    const { options } = this.state;

    return (
      <div className="as-p--16">
      <as-dropdown
        ref={node => { this.widget = node; }}
        default-text="Select Option"
        can-clear="true">

      </as-dropdown>
      </div>
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
  setNeighbourhoods: selected => dispatch(setNeighbourhoods(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
