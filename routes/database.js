var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'rho',
};

var pool = new pg.Pool(config);

router.get('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to the database', err);
        res.sendStatus(500);
        return;
      }

      client.query('SELECT * FROM favorites;',
        function (err, result) {
          if (err) {
            console.log('Error querying the database', err);
            res.sendStatus(500);
            return;
          }

          console.log('Got rows from the database: ', result.rows);
          res.send(result.rows);
        });

    } finally {
      done();
    }
  });
});

router.post('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to the database', err);
        res.sendStatus(500);
        return;
      }

      client.query('INSERT INTO favorites (url, comment) VALUES ($1, $2) returning *;',
        [req.body.url, req.body.comment],
        function (err, result) {
          if (err) {
            console.log('Error querying the database', err);
            res.sendStatus(500);
            return;
          }

          console.log('Got rows from the database: ', result.rows);
          res.send(result.rows);
        });
    } finally {
      done();
    }
  });
});

module.exports = router;
