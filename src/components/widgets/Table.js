import React, { useState, useEffect } from 'react';
import '@carto/airship-style';
import C from '../../data/C'
import axios from 'axios';
import { connect } from "react-redux";

const { SQL_API_URL, API_KEY, USERNAME } = C;

const SQL_CLIENT = axios.create({
  method: 'get',
  url: SQL_API_URL,
  params: {
      api_key: API_KEY
  }
});

const Table = ({ query, map, useMapBounds, useLimit, viewport, headers }) => {
    const [data, setData] = useState(null)
    const [columns, setColumns] = useState([])

    let bounds
    let bbox

    if (map) {
        bounds = map.getBounds()

        bbox = `WHERE the_geom @
        ST_MakeEnvelope(
        ${bounds._northEast.lng},
        ${bounds._northEast.lat},
        ${bounds._southWest.lng},
        ${bounds._southWest.lat},
        4326
        )`
    }

    let finalQuery = query

    if (useMapBounds !== false && useLimit === false) {
        finalQuery = `${query} ${bbox}`
    } else if (useMapBounds === false && useLimit !== false) {
        finalQuery = `${query} LIMIT ${useLimit}`
    } else if (useMapBounds !== false && useLimit !== false) {
        finalQuery = `${query} ${bbox} LIMIT ${useLimit}`
    }

    useEffect(() => {
        SQL_CLIENT.request({
            params: {
                q: finalQuery
            }
        })
        .then((result) => {
            setData(result.data.rows)
            setColumns(Object.keys(result.data.fields))
        })
        .catch((error) => {
            console.log(error)
        });
    }, [viewport])

    let tableContents
    let headerContents

    if (data) {
        headerContents = headers.map((i) => 
             <th>{i}</th>
        )
        tableContents = data.map((value, key) => 
            <tr key={key}>
                {
                    columns.map(function(i)  {
                    return <td key={i}>{value[i]}</td>
                })
                }
            </tr>
        )
    }


    // list.map((item, index) => {
    //     return (
    //       <div key={index}>
    //         <ul >{item.value}</ul>
    //        {
    //         item.list.map((subitem, i) => {
    //           return (
    //              <ul ><li>{subitem.value}</li></ul>
    //           )
    //         })
    //        }
    //       </div>
    //     )
    //   }

    // if (showList) {
    //     return (
    //         <type>
    //             {this.props.items.map(function(item) {
    //                 return <li key={item.id}>{item.value}</li>
    //             })}
    //         </type>
    //     )
    // }

return (
    <div className="as-p--16">
    <table className="as-table">
      <thead>
        <tr>
        {headerContents}
        </tr>
      </thead>
      <tbody>
        {tableContents}
      </tbody>
    </table>
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

export default connect(mapStateToProps)(Table);
