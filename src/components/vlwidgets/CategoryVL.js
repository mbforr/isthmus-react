import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto-vl'
import '@carto/airship-style';

class CategoryVL extends Component {

  static defaultProps = {
    showHeader: true,
    showClearButton: true,
    useTotalPercentage: false,
    visibleCategories: 10,
  };

  state = {
    categories: [],
    selection: [],
    data: [],
    filter: null,
    originalStyle: null
  };


  componentDidMount() {
    this._setupConfig();
    this.setupUpdate(this.onCategoriesChanged);
    // this.setupUpdate(this.onCategoriesChanged);
    // this._setupEvents();
    // this._addDataview();
  }

  _setupConfig() {
    //this works fine
    const { layer } = this.props.layers.railaccidents
    const { showHeader, showClearButton, useTotalPercentage, visibleCategories } = this.props;
    const { categories } = this.state;
    this.widget.showHeader = showHeader;
    this.widget.showClearButton = showClearButton;
    this.widget.useTotalPercentage = useTotalPercentage;
    this.widget.visibleCategories = visibleCategories;
    this.widget.categories = categories;
  
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.setupUpdate(this.onCategoriesChanged);
      this.handleCategoriesSelected()
    }
  }

  setupUpdate(categoriesCallback) {
    const { layer } = this.props.layers.railaccidents

    if (layer.viz) {
      const originalStyle = layer.viz.color
      this.setState({ originalStyle: originalStyle })
      console.log(this.state.originalStyle)
    }
    
    layer.on('updated', () => {
      const cat = layer.viz.variables.categories.value;
      categoriesCallback && this.onCategoriesChanged(cat);
    }); 
  }

  onCategoriesChanged(categories) {
    const data = categories.map((category) => {
      const { x, y } = category;
      return {
        name: x,
        value: y
      };
    });
    
    this.setState({ categories: data })
    this.widget.categories = this.state.categories
  }

  handleCategoriesSelected () {
    this.widget.addEventListener('categoriesSelected', (event) => {
      this.updateFilter(event.detail);
    });
  }

  updateFilter(selected) {
    if (selected.length > 0) {
      const formattedData = selected.map((selected) => {
        return `'${selected}'`;
      });
      // selected = `filter: $railroad in [${formattedData.join(',')}]`;
      selected = `$railroad in [${formattedData.join(',')}]`;
    } else {
      selected = '';
    }
    this.applyFilter(selected);
  }

  applyFilter(updateFilter) {
    const { viz, style, layer, source } = this.props.layers.railaccidents

    const color = `ramp(viewportQuantiles($total_damage, 7), sunsetdark)`;
    const opacity = '1';
    const stroke = `#191970`
    let colorExp = `opacity(${color}, ${opacity})`;
    let strokeExp = `opacity(${stroke}, ${opacity})`
  
    // if (!viz) {
    //   return;
    // }

    if (updateFilter) {
      colorExp = `opacity(${color}, ${updateFilter} * ${opacity})`;
      strokeExp = `opacity(${stroke}, ${updateFilter} * ${opacity})`;
      console.log(colorExp)
      // colorExp = `
      // width: 8
      // color: ramp(viewportQuantiles($total_damage, 7), sunsetdark, grey)
      // strokeWidth: 0.5
      // ${updateFilter}
      // strokeColor: #191970
      // @categories: viewportHistogram($railroad, 1, 12)
      // `
      // const newViz = new carto.Viz(colorExp)
      // console.log(layer.blendToViz(newViz))
      // layer.blendToViz(newViz, 500)
    }

    if (!updateFilter) {
      colorExp = color;
      strokeExp = stroke;
      // colorExp = `
      // width: 8
      // color: ramp(viewportQuantiles($total_damage, 7), sunsetdark, grey)
      // strokeWidth: 0.5
      // strokeColor: #191970
      // @categories: viewportHistogram($railroad, 1, 12)
      // `
      // layer.blendToViz(viz, 500)
    }

    layer.viz.color.blendTo(colorExp)
    layer.viz.strokeColor.blendTo(strokeExp)
    // this.widget.clearSelection().then(() => layer.viz.color.blendTo(this.state.originalStyle))
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
        visibleCategories={10}
        onSelectedChanged={this.handleCategoriesSelected}
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryVL);
