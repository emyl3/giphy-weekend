const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const database = require('./routes/database');

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/database', database);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('server listening for requests on port:', server.address().port);
});
