const mongoose = require('mongoose');

const hostname = '127.0.0.1';
const port = 27017;
const database = 'FindDev';

function connect() {
  mongoose.connect(`mongodb://${hostname}:${port}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = connect();
