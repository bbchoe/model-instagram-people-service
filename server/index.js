const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { addUserToDbAsync } = require('../database/index');

const app = express();
const port = 8080;

app.listen(port, () => console.log('Server listening on port: ', port));

// app.use(morgan('dev'));
app.use(bodyParser.json());

app.put('/user/add', (req, res) => {
  // console.log(req.body);
  addUserToDbAsync(req.body)
    .then((success) => {
      // console.log(success);
      res.send(success);
    })
    .catch(err => console.log('Problem adding to DB ', err));
});
