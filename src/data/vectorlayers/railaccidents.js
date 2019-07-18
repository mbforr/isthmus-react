export default {
    name: 'Rail Accidents',
  
    visible: true,
  
    style: `
        width: 8
        @railroad: $railroad
        color: ramp(viewportQuantiles($total_damage, 7), sunsetdark)
        strokeWidth: 0.5
        strokeColor: #191970
        @categories: viewportHistogram($railroad, 1, 12)
        @v_avg: viewportAvg($total_damage)
    `,
  
    query: `
      SELECT * FROM rail_accidents
    `,

    table: `
      rail_accidents
    `
  };
  