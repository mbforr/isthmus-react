export const STORE_LAYERS = '@Layers/STORE';
export const storeLayers = layers => ({
  type: STORE_LAYERS,
  layers,
});

export const ADD_LAYER = '@Layers/ADD';
export const addLayer = layer => ({
  type: ADD_LAYER,
  layer,
});

export const SET_MAP = '@Map/SET';
export const setMap = map => ({
  type: SET_MAP,
  map,
});

export const CHANGE_VIEWPORT = '@Map/CHANGE_VIEWPORT'
export const changeViewport = viewport => ({
  type: CHANGE_VIEWPORT,
  viewport
});

export const CHANGE_CARTO_BOUNDINGBOX = '@Map/CHANGE_CARTO_BOUNDINGBOX'
export const changeCartoBBox = boundingbox => ({
  type: CHANGE_CARTO_BOUNDINGBOX,
  boundingbox
});


export const SET_BBOX = '@Filters/SET_BBOX';
export const setBboxFilter = bbox => ({
  type: SET_BBOX,
  bbox,
});


export const TOGGLE_LAYER = '@Layers/TOGGLE';
export const toggleLayer = name => ({
  type: TOGGLE_LAYER,
  name,
});

