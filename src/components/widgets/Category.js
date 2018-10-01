import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';

class Category extends Component {

  static defaultProps = {
    showHeader: true,
    showClearButton: true,
    useTotalPercentage: false,
    visibleCategories: Infinity,
  };

  state = {
    categories: [],
    selection: [],
    filter: null
  };


  componentDidMount() {
    this._setupConfig();
    this._setupEvents();
    this._addDataview();
  }

  // componentDidUpdate() {
  //   this._setupConfig();
  // }

  componentDidUpdate(prevProps) {
    this._setupConfig();
    const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.props.map)
    // this.dataView.addFilter(this.props.boundingbox);
    // this.dataView.on('dataChanged', this.onDataChanged);

    if(prevProps !== this.props) {
      this.dataView.addFilter(this.props.boundingbox);
    }

  }

  _setupConfig() {
    //this works fine
    const { showHeader, showClearButton, useTotalPercentage, visibleCategories } = this.props;
    const { categories } = this.state;
    this.widget.showHeader = showHeader;
    this.widget.showClearButton = showClearButton;
    this.widget.useTotalPercentage = useTotalPercentage;
    this.widget.visibleCategories = visibleCategories;
    this.widget.categories = categories;

  }
  _addDataview() {
    this.dataView = new carto.dataview.Category(this.props.categoryLayer, this.props.column, {
      limit: 10,
      operation: this.props.operation,
      operationColumn: this.props.operationColumn
    });

    this.dataView.on('dataChanged', ({ categories }) => this.setState({ categories }));

    this.props.client.addDataview(this.dataView);
 }

  _createFilter() {
    const filter = new carto.filter.Category(this.props.column, { in: this.state.selection });
    this.props.categoryLayer.addFilter(filter);
    this.setState({  filter });
  }

  _updateFilter() {
    this.filter.setFilters({ in: this.state.selection });
  }

  onSelectedChanged = ({ detail }) => {
    let { filter } = this.state;

    if (filter && !detail.length) {
      this.props.categoryLayer.removeFilter(filter);
      filter = null;
    }

    this.setState({ selection: detail, filter });
  }

  onApplySelection = () => {
    const { filter, selection } = this.state;

    selection.length > 0 && !filter
      ? this._createFilter()
      : this._updateFilter();
  }

  _onSelectedChanged(event) {
    const { onSelectedChanged } = this;
    onSelectedChanged && onSelectedChanged(event);
  }

  _setupEvents() {
    this.widget.addEventListener('categoriesSelected', event => this._onSelectedChanged(event));
  }


  render() {
    const { title, description } = this.props;
    const { categories, filter, selection } = this.state;

    const showApplyButton = selection.length > 0 && !filter;

    return (
      <div className="as-p--16">
      <as-category-widget
        ref={node => { this.widget = node; }}
        heading={title}
        description={description}
        categories={categories}
        onSelectedChanged={this.onSelectedChanged}
        showClearButton={!!filter}
      />
      { showApplyButton && (
        <div className="as-flex as-justify-end as-mt--8">
          <button className="as-btn as-btn--s as-btn--primary" onClick={this.onApplySelection}>
            Apply selection
          </button>
        </div>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);
