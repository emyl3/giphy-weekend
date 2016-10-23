const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('server listening for requests on port:', server.address().port);
});
