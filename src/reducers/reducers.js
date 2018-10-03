import carto from '@carto/carto.js';
import * as actions from '../actions/actions';
import C from '../data/C'
import L from 'leaflet';
import index from '../data/layers/index';

// import { THEME } from './constants'

// export const theme = (state = null, action) => {
//   switch (action.type) {
//     case actions.TOGGLE_THEME:
//       return action.active ? THEME : null;
//
//     default:
//       return state;
//   }
// }

const cartoClient = new carto.Client({ apiKey: C.API_KEY, username: C.USERNAME});
export const client = (state = cartoClient, action) => state;

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

const DEFAULT_LAYERS = Object.keys(index).reduce((all, layerName) => {
  const { options, ...other} = index[layerName];

  const source = new carto.source.SQL(other.query);
  const style = new carto.style.CartoCSS(other.cartocss);
  const layer = new carto.layer.Layer(source, style, options);

  return { ...all, [layerName]: { source, style, layer, ...other } };
}, {});

export const layers = (state = DEFAULT_LAYERS, action) => {
  switch (action.type) {
    case actions.STORE_LAYERS:
      console.log(action.layers)
      return action.layers;

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
