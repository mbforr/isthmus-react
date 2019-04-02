import railLayer from '../data/railLayer';
import C from '../data/C'
import carto from '@carto/carto.js';

const DEFAULT_VIEWPORT = {
  center: [33.753707, -84.389363],
  zoom: 12
}

const CARTO_CLIENT = new carto.Client({ apiKey: C.API_KEY, username: C.USERNAME});

const mapSettingsDefaultState = {
  viewport: DEFAULT_VIEWPORT,
  cartoClient: CARTO_CLIENT,
  map: null,
  rail: {
    layerStyle: railLayer.style,
    hidelayers: false,
    source: railLayer.source,
    click: true,
    filters: []
  },
  analyzedStore: 0,
  focusedTab: 0
};

export default (state = mapSettingsDefaultState, action) => {
  switch (action.type) {
    case 'CHANGE_VIEWPORT':
      return {
        ...state,
        viewport: action.viewport
      };
    case 'SET_MAP':
    return {
      ...state,
      map: action.map
    }
    default:
      return state;
  }
};
