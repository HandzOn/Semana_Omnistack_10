const express = require('express');
const routes = require('./routes');
const http = require('http');
const cors = require('cors');
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);
setupWebsocket(server);

require('./config/database');

app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(3333, () => {
  console.log('Project running on port 3333');
});