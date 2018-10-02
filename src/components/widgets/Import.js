import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import LayerToggle from '../widgets/LayerToggle'
import '@carto/airship-style';
import axios from 'axios';
import C from '../../data/C'
import carto from '@carto/carto.js';

const { IMPORT_API_URL } = C;


class Import extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
      this.toggleHidden = this.toggleHidden.bind(this);
  }

  state = {
    description: '',
    selectedFile: '',
    fileName: null,
    status: null,
    table: null,
    error: null,
    hidden: true
  };

  toggleHidden() {
    this.setState({ hidden: !this.state.hidden })
    this.setState({ status: null })
  }

  onChange = (e) => {
    switch (e.target.name) {
      case 'selectedFile':
        this.setState({ selectedFile: e.target.files[0] });
        this.setState({ fileName: e.target.files[0].name });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { description, selectedFile } = this.state;
    let formData = new FormData();
    formData.append('description', description);
    formData.append('selectedFile', selectedFile);

    axios.post('/', formData)
      .then((result) => {
        this.setState({ status: result.data.success })
        this.setState({ table: result.data.table })
        this.setState({ error: null })
        console.log(this.state.status)

        const source = new carto.source.Dataset(result.data.table);

        /*
          Add in the ability to do SQL and other options/events here from the props
        */

        const style = new carto.style.CartoCSS(`
          #layer {
            marker-width: 7;
            marker-fill: #EE4D5A;
            marker-fill-opacity: 0.9;
            marker-line-color: #FFFFFF;
            marker-line-width: 1;
            marker-line-opacity: 1;
            marker-placement: point;
            marker-type: ellipse;
            marker-allow-overlap: true;
          }
        `);
        const layer = new carto.layer.Layer(source, style);

        /*
          Look at the Redux actions and see if it can dispatc the layer into the store
        */

        this.props.client.addLayer(layer);
        this.props.client.getLeafletLayer().addTo(this.props.map);

      })
      .catch((error) => {
        this.setState({ status: false })
        this.setState({ table: null })
        this.setState({ error: error.message })
        console.log(error)
      })
  }

  render() {

    const { description, selectedFile, table, error, hidden, fileName } = this.state;

    const responseStatus = this.state.status

    console.log(this.state)

    let alert

    if (responseStatus === true) {
      alert = <div className="as-p--16">
              <div className="as-flag">
              <div className="as-flag__icon">
                <i style={{color: '#80B622'}} class="as-icon-alert-fill"></i>
              </div>
              <div className="as-flag__content">
                <h4 className="as-body as-color--type-01">Import successful</h4>
                <p className="as-body as-color--type-03">Your table {table} was imported successfully!</p>
              </div>
              <div className="as-flag__icon">
                <button className="as-flag__button" onClick={this.toggleHidden}>
                  <i style={{color: '#1785FB'}} className="as-icon-close"></i>
                </button>
              </div>
            </div>
            </div>
    } else if (responseStatus === false) {
      alert = <div className="as-p--16">
              <div className="as-flag">
              <div className="as-flag__icon">
                <i style={{color: '#F3522B'}} class="as-icon-alert-fill"></i>
              </div>
              <div className="as-flag__content">
                <h4 className="as-body as-color--type-01">Error on import</h4>
                <p className="as-body as-color--type-03">There was an error with your import!</p>
                <p className="as-body as-color--type-03">{error}</p>
              </div>
              <div className="as-flag__icon">
                <button className="as-flag__button" onClick={this.toggleHidden}>
                  <i style={{color: '#1785FB'}} className="as-icon-close"></i>
                </button>
              </div>
            </div>
            </div>
    } else if (responseStatus === null ) {
      alert = null
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <div className="as-p--8">
        <div className="as-p--8">
        <label class="fileContainer">
            <i aria-hidden className="as-icon-arrow-up"> </i>
            {!fileName ? '  Import' : `  ${fileName}`}
            <input type="file" name="selectedFile" onChange={this.onChange}/>
        </label>

        </div>
        <div className="as-p--8">
        <button
          type="submit"
          className="as-btn as-btn--secondary">Submit</button>
        </div>
        </div>
        </form>
        {alert}
      </div>
    );
  }

}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

const mapDispatchToProps = dispatch => ({
  setNeighbourhoods: selected => dispatch(setNeighbourhoods(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Import);
