import React, {useState} from 'react';
import { connect } from 'react-redux';
import { operation } from '@carto/carto.js';
import Category from '.././widgets/Category'
import Histogram from '.././widgets/Histogram'
import Formula from '.././widgets/Formula'
import Range from '.././widgets/Range'
import Export from '.././widgets/Export'
import '@carto/airship-style';
import { set } from 'gl-matrix/src/gl-matrix/mat2d';

const RightBar = ({ layers, size, background, name }) => {
  const z = `as-sidebar as-sidebar--${size} as-sidebar--right ${background}`;

  const [data, setData] = useState(null)

  layers.stores.layer.on('featureClicked', e => {
    console.log(JSON.parse(e.data.popularity_by_day))
    setData(e.data)
    // this.setState({ data: e.data })
    // this.setState({ storeid: e.data.id })
    // this.props.map.setView([e.data.latitude, e.data.longitude], 11);

    
    // this.props.layers.targetpoints.style.setContent(`     
    // #layer  {
    //   polygon-fill: #dc9393;
    //   polygon-opacity: 0.7;
    //   polygon-comp-op: overlay;
    //   ::outline {
    //     line-width: 0.3;
    //     line-color: #ebb9b9;
    //     line-opacity: 1;
    //     [id = ${e.data.id}] {
    //       line-width: 2;
    //       line-color: #fff;
    //       line-opacity: 1;
    //     }
    //   }
    // }
    // `)


  });

  let popUp

  if (!data) {
    popUp = <h1 className="as-title">Click a store to see more information</h1>
  } else {
    const dwell = JSON.parse(data.bucketed_dwell_times)
    console.log(data)

    const dwellTable = Object.keys(dwell).map((k, v) => 
    
      <tr key={k}>
        <td>{k}</td>
        <td>{dwell[k]}</td>
      </tr>
      )

      console.log(dwellTable)


    popUp = <div>
      <h1 className="as-title">{data.location_name}</h1>
      <h4 className="as-subheader">{data.address}</h4>
      <p className="as-body"><b>Visits Count: </b>{data.raw_visit_counts}</p>
      <p className="as-body"><b>Visitors Count: </b>{data.raw_visitor_counts}</p>
      <p className="as-body"><b>Median Dwell: </b>{data.median_dwell} min.</p>
      <br />
      <hr />
      <br />
      <h4 className="as-subheader">Dwell Times</h4>
      <table className="as-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Visitors</th>
          </tr>
        </thead>
        <tbody>
         {dwellTable}
        </tbody>
      </table>
      <br />
      <hr />
      <br />
      <h4 className="as-subheader">Popularity by Day</h4>
      <table className="as-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Visitors</th>
          </tr>
        </thead>
        <tbody>
         {Object.keys(JSON.parse(data.popularity_by_day)).map((k, v) => 
          <tr key={k}>
            <td>{k}</td>
            <td>{JSON.parse(data.popularity_by_day)[k]}</td>
          </tr>
          )} 
        </tbody>
      </table>
      <br />
      <hr />
      <br />
      <h4 className="as-subheader">Related Brands (Same Month)</h4>
      <table className="as-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Visitors</th>
          </tr>
        </thead>
        <tbody>
         {Object.keys(JSON.parse(data.related_same_month_brand)).map((k, v) => 
          <tr key={k}>
            <td>{k}</td>
            <td>{JSON.parse(data.related_same_month_brand)[k]}</td>
          </tr>
          )} 
        </tbody>
      </table>
      <br />
      <hr />
      <br />
      <h4 className="as-subheader">Related Brands (Same Day)</h4>
      <table className="as-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Visitors</th>
          </tr>
        </thead>
        <tbody>
         {Object.keys(JSON.parse(data.related_same_day_brand)).map((k, v) => 
          <tr key={k}>
            <td>{k}</td>
            <td>{JSON.parse(data.related_same_day_brand)[k]}</td>
          </tr>
          )} 
        </tbody>
      </table>

    </div>
  }

  
  return (
    <aside className={z} data-name={name}>
    <div className="as-m--24">
    {popUp}
    <br />
    <hr />
    <br />
    </div>
    <div className="as-m--24">
    <Formula
        title='Total Visits'
        description='Total number of visits in the map view'
        round={true}
        currency={false}
        locale='en-US'
        currencyType='USD'
        layer={layers.stores.source}
        column='raw_visit_counts'
        operation={operation.SUM}
      />
      <div className="as-p--16">
      <Histogram
        title='Visits'
        description='Number of visits'
        layer={layers.stores.source}
        column='raw_visit_counts'
        bins={30}
      />
      </div>
      <div className="as-p--16">
      <Histogram
        title='Visitors'
        description='Number of visitors'
        layer={layers.stores.source}
        column='raw_visitor_counts'
        bins={30}
      />
      </div>
      <div className="as-p--16">
      <Histogram
        title='Median Dwell'
        description='Median dwell time'
        layer={layers.stores.source}
        column='median_dwell'
        bins={30}
      />
      </div>
      </div>
    </aside>

  )
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});


export default connect(mapStateToProps)(RightBar);
