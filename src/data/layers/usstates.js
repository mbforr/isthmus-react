export default {
  name: 'US States',

  visible: true,

  cartocss: `
  #layer {
  polygon-fill: #6ba2dc;
  polygon-opacity: 1;
}
#layer::outline {
  line-width: 1;
  line-color: #FFFFFF;
  line-opacity: 0.5;
}
  `,

  query: `
    SELECT * FROM us_states
  `,

  options: {
    featureClickColumns: []
  }
};
