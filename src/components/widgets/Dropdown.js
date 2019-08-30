import React, { useState, useEffect,  useRef } from 'react';
import { connect } from 'react-redux';
import '@carto/airship-style';
import carto from '@carto/carto.js';


const Dropdown = ({ categoryLayer, column, operation, operationColumn, client, placeholder }) => {

const widget = useRef(null)

const [cats, setCategories] = useState([])
const [selected, setSelected] = useState(null)
const [cartoFilter, setCartoFilter] = useState(null)


useEffect(() => {

  widget.current.options = cats;

  widget.current.defaultText = placeholder
  widget.current.showClearButton = true;
  setSelected(widget.current.selectedOption)

  widget.current.addEventListener('optionChanged', (e) => {
    setSelected(e.detail)
  })
}, [cats])


useEffect(() => {

  const dataView = new carto.dataview.Category(categoryLayer, column, {
    limit: 10,
    operation: operation,
    operationColumn: operationColumn
  });

  dataView.on('dataChanged', ({ categories }) => {
    setCategories(categories.map((value) => {
      const val = {"text": value.name, "value": value.name}
      return val
    }))
    
  });

  client.addDataview(dataView);
  console.log(cats)
}, [])

const addFilter = () => {
  const filter = new carto.filter.Category(column, { eq:  selected  });
  categoryLayer.addFilter(filter);
  setCartoFilter(filter)
}

const removeFilter = () => {
  categoryLayer.removeFilter(cartoFilter);
  setCartoFilter(null)
}


useEffect(() => {
  
  !selected ? removeFilter() : addFilter() 

}, [selected])



return (
  <div className="as-p--16">
  <as-dropdown
    ref={widget}
  >    
  </as-dropdown>
  </div>    
)

}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

export default connect(mapStateToProps)(Dropdown);
