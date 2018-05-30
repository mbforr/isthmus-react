export default {
  name: 'Neighbourhoods',

  visible: true,

  cartocss: `
    #layer {
      line-color: #000;
      line-opacity: 0.2;
    }
  `,

  query: `
    SELECT * FROM neighbourhoods
  `,

  options: {
  }
};
