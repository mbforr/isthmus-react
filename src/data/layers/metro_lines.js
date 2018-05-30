export default {
  name: '🚋 Metro Lines',

  visible: true,

  style: `
    #layer {
      line-color: #FABADA;
      line-width: 2px;

      line-color: ramp(
        [name],
        (#30a3dc,#cd031d,#ffe114,#944248,#96bf0d,#a0a5a7,#faa64a,#f27ca2,#a93094,#084594,#008b43,#a49a00,#00aa66,#0e4a97,#0066ff,#892ca0,#ff0000),
        ("L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11", "L12", "L14", "R", "ML1", "ML2", "ML3"), "="
      )
    }
  `,

  source: `
    SELECT cartodb_id, the_geom, the_geom_webmercator, name FROM jbotella.metro_lines
  `,

  options: {
  }
};
