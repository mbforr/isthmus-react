import * as actions from '../actions/actions';
import C from '../data/C'
import L from 'leaflet';
// import index from '../data/layers/index';
import index from '../data/vectorlayers/index';
import mapboxgl from 'mapbox-gl'
import * as cartoVL from '@carto/carto-vl'
import * as cartoJS from '@carto/carto.js'
import { VLBridge } from '@carto/airship-bridge'

const carto = C.VL ? cartoVL : cartoJS

console.log(carto)

// if (C.VL === true) {
//   cartoClient = cartoVL.setDefaultAuth({
//     username: C.USERNAME,
//     apiKey: C.API_KEY
//   });

//   console.log(cartoClient)
// } else {
//   cartoClient = new cartoJS.carto.Client({ apiKey: C.API_KEY, username: C.USERNAME});
// }

// const CC = new cartoJS.Client({ apiKey: C.API_KEY, username: C.USERNAME});

// console.log(CC)

carto.setDefaultAuth({
  username: C.USERNAME,
  apiKey: C.API_KEY
});

// console.log(CC)

// export const client = (state = CC, action) => state;

export const map = (state = false, action) => {
  switch (action.type) {
    case actions.SET_MAP:
      return action.map;

    default:
      return state;
  }
}

const DEFAULT_VIEWPORT = {
  center: C.CENTER,
  zoom: C.ZOOM,
  bbox: ''
}

export const viewport = (state = DEFAULT_VIEWPORT, action) => {
  switch (action.type) {
    case actions.CHANGE_VIEWPORT:
      return action.viewport;

    default:
      return state;
  }
}

export const boundingbox = (state = false, action) => {
  switch (action.type) {
    case actions.CHANGE_CARTO_BOUNDINGBOX:
      return action.boundingbox;

    default:
      return state;
  }
}

// const DEFAULT_JS_LAYERS = Object.keys(index).reduce((all, layerName) => {
//   const { options, ...other} = index[layerName];

//   const source = new cartoJS.source.SQL(other.query);
//   const style = new cartoJS.style.CartoCSS(other.cartocss);
//   const layer = new cartoJS.layer.Layer(source, style, options);

//   return { ...all, [layerName]: { source, style, layer, ...other } };
// }, {});

const DEFAULT_VL_LAYERS = Object.keys(index).reduce((all, layerName) => {
  const { options, ...other} = index[layerName];

  const viz = new carto.Viz(other.style);
  const source = new carto.source.Dataset(other.table);
  const layer = new carto.Layer(other.table, source, viz);

  // const bridge = new VLBridge({
  //   carto: cartoVL,
  //   map: map,
  //   layer: layer,
  //   source: source
  // });

  const bridge = null

  return { ...all, [layerName]: { source, viz, layer, bridge, ...other } };
}, {});

let DEFAULT_LAYERS

// if (C.VL === true) {
//   DEFAULT_LAYERS = DEFAULT_VL_LAYERS
// } else {
//   DEFAULT_LAYERS = DEFAULT_JS_LAYERS
// }

export const layers = (state = DEFAULT_VL_LAYERS, action) => {
  switch (action.type) {
    case actions.STORE_LAYERS:
      return action.layers;

    case actions.ADD_BRIDGE:
      Object.entries(action.layers).forEach(entry => {
        let bridge = entry[1].bridge
        bridge.build()
        console.log(entry)
      });

    case actions.ADD_LAYER:
      console.log(action.layer)
      console.log(typeof action.layer)
      const l = action.layer
      return {
        ...state, ...l
        }

    case actions.TOGGLE_LAYER: {
      const layer = state[action.name];

      layer.visible ? layer.layer.hide() : layer.layer.show();

      return {
        ...state,
        [action.name]: {
          ...layer,
          visible: !layer.visible
        }
      }
    }

    default:
      return state;
  }
}
