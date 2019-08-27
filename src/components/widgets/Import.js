import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import LayerToggle from '../widgets/LayerToggle'
import { addLayer } from '../../actions/actions';
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
    selectedFile: '',
    fileName: null,
    running: false,
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
    this.setState({ running: true })
    const { description, selectedFile } = this.state;
    let formData = new FormData();
    formData.append('description', description);
    formData.append('selectedFile', selectedFile);

    axios.post(this.props.page, formData)
      .then((result) => {
        this.setState({ status: result.data.success })
        this.setState({ table: result.data.table })
        this.setState({ error: null })
        this.setState({ running: false })

        let query

        if (this.props.sql !== false) {
          query = `WITH a AS (SELECT * FROM ${result.data.table}) ${this.props.sql}`
        } else {
          query = `SELECT * FROM ${result.data.table}`
        }

        const source = new carto.source.SQL(query);

        /*
          Add in the ability to do SQL and other options/events here from the props
        */

        const style = new carto.style.CartoCSS(this.props.cartocss);
        const layer = new carto.layer.Layer(source, style);

        /*
          Look at the Redux actions and see if it can dispatch the layer into the store
        */

        const visible = true

        this.props.client.addLayer(layer);
        this.props.client.getLeafletLayer().addTo(this.props.map);

        if (this.props.back === true) {
          layer.bringToBack();
        }

        const { cartocss } = this.props
        const name = this.state.table

        const reduxLayer = { [name]: { cartocss, layer, name, query, source, style, visible } }
        console.log (reduxLayer)

        this.props.addLayer(reduxLayer)

      })
      .catch((error) => {
        this.setState({ status: false })
        this.setState({ table: null })
        this.setState({ error: error.message })
      })
  }

  render() {

    const { selectedFile, table, error, hidden, fileName, running } = this.state;

    const responseStatus = this.state.status

    const { title, description } = this.props;

    let alert

    if (responseStatus === true) {
      alert = <div className="as-p--16">
              <div className="as-flag">
              <div className="as-flag__icon">
                <i style={{color: '#80B622'}} className="as-icon-alert-fill"></i>
              </div>
              <div className="as-flag__content">
                <h4 className="as-body as-color--type-01">Import successful</h4>
                <p className="as-body as-color--type-03">Your table {table} was imported successfully!</p>
              </div>
              <div className="as-flag__icon">
                <button className="as-flag__button" onClick={this.toggleHidden}>
                  <i style={{color: '#1785FB'}} className="as-icon as-icon-close"></i>
                </button>
              </div>
            </div>
            </div>
    } else if (responseStatus === false) {
      alert = <div className="as-p--16">
              <div className="as-flag">
              <div className="as-flag__icon">
                <i style={{color: '#F3522B'}} class="as-icon as-icon-alert-fill"></i>
              </div>
              <div className="as-flag__content">
                <h4 className="as-body as-color--type-01">Error on import</h4>
                <p className="as-body as-color--type-03">There was an error with your import!</p>
                <p className="as-body as-color--type-03">{error}</p>
              </div>
              <div className="as-flag__icon">
                <button className="as-flag__button" onClick={this.toggleHidden}>
                  <i style={{color: '#1785FB'}} className="as-icon as-icon-close"></i>
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
          <h4 className="as-subheader as-font--medium">{title}</h4>
          <p className="as-body">{description}</p>
        </div>
        <div className="as-p--8">
        <label className="fileContainer">
            <i className="as-icon as-icon-arrow-up"> </i>
            {!fileName ? '  Import' : `  ${fileName}`}
            <input type="file" name="selectedFile" onChange={this.onChange}/>
        </label>

        </div>
        <div className="as-p--8">
        <button
          type="submit"
          className="as-btn as-btn--secondary">
          {running === true ? <span class="as-loading as-loading--s"> <svg viewBox="0 0 50 50"> <circle cx="25" cy="25" r="20" fill="none" /> </svg> </span> : 'Submit'}
        </button>
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
  addLayer: layer => dispatch(addLayer(layer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Import);
