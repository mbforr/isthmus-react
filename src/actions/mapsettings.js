export const changeViewport = (viewport) => ({
  type: 'CHANGE_VIEWPORT',
  viewport
});

export const getTargetStore = (store) => ({
  type: 'GET_TARGET_STORE',
  store
});

export const getFocusedTab = (tab) => ({
  type: 'GET_FOCUSED_TAB',
  tab
});

export const setCategory = (category) => ({
  type: 'SET_CATEGORY',
  category
});

export const setMap = (map) => ({
  type: 'SET_MAP',
  map
});
