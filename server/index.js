const apm = require('elastic-apm-node').start({
  appName: 'model-instagram-people-service',
  secretToken: '',
  serverUrl: '',
});
const express = require('express');
const bodyParser = require('body-parser');
const { addUserToDbAsync } = require('../database/index');

const app = express();
const port = 8080;

app.listen(port, () => console.log('Server listening on port: ', port));

app.use(bodyParser.json());

app.put('/user/add', (req, res) => {
  addUserToDbAsync(req.body)
    .then((success) => {
      console.log(success);
      res.send(success);
    })
    .catch(err => console.log('Problem adding to DB ', err));
});
