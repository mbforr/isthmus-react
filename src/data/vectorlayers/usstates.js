export default {
    name: 'US States',
  
    visible: true,
  
    style: `
        color: #666
        strokeColor: opacity(white, 0.5)
    `,
  
    query: `
      SELECT * FROM us_states
    `,

    table: `
    us_states
    `
  };
  