export default {
    style: `
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

    source: `SELECT * FROM rail_accidents`
};
