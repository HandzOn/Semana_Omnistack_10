const express = require('express');
const routes = require('./routes');
const app = express();

require('./config/database');

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Project running on port 3333');
});