export default {
  name: 'Rail Accidents',

  visible: true,

  cartocss: `
  #layer {
    marker-width: 7;
    marker-fill: ramp([equipment_damage], (#f3e79b, #fac484, #f8a07e, #eb7f86, #ce6693, #a059a0, #5c53a5), quantiles);
    marker-fill-opacity: 1;
    marker-allow-overlap: true;
    marker-line-width: 1;
    marker-line-color: #FFFFFF;
    marker-line-opacity: 1;
  }
  `,

  query: `
    SELECT * FROM rail_accidents
  `,

  options: {
    featureClickColumns: ['cartodb_id', 'railroad', 'total_damage', 'cause', 'weather', 'accident_type', 'image']
  }
};
