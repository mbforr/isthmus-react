const path = require('path')
const express = require('express');
const app = express();
const public = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000;

app.use(express.static(public));

app.get('*', (req, res) => {
  res.sendFile(path.join(public, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
