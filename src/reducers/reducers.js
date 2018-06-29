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
      return action.layers;

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

const FILTERS_INITIAL_STATE = {
  price: false,
  bbox: false,
  neighbourhoods: false,
}

export const filters = (state = FILTERS_INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_PRICE: {
      const { min, max } = action.filter;

      return {
        ...state,
        price: `price BETWEEN ${min} AND ${max}`,
      };
    }

    case actions.SET_BBOX: {
      const [ xmin, ymin, xmax, ymax ] = action.bbox;

      return {
        ...state,
        bbox: `ST_Intersects(the_geom_webmercator, ST_Transform(ST_MakeEnvelope(${xmin}, ${ymin}, ${xmax}, ${ymax}, 4326), 3857))`,
      };
    }

    case actions.SET_NEIGHBOURHOODS: {
      const neighbourhoods = action.neighbourhoods.map(name => `'${name}'`).join(',');

      if (neighbourhoods.length === 0) return {
        ...state,
        neighbourhoods: false,
      };

      return {
        ...state,
        neighbourhoods: `railroad IN (${neighbourhoods})`,
      };
    }

    default:
      return state;
  }
}
