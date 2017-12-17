const apm = require('elastic-apm-node').start({
  appName: 'model-instagram-people-service',
  secretToken: '',
  serverUrl: '',
});
const express = require('express');
const bodyParser = require('body-parser');
const { addUserToDbAsync } = require('../database/index');
const { bulkAddUsersToDb, getBatchOfUsers } = require('../helpers/getBatchOfUsers');

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

app.put('/bulkuser/add', (req, res) => {
  const volOfUsersToAdd = 20000;
  const batchSize = 10000;

  for (let i = 0; i < volOfUsersToAdd; i += batchSize) {
    getBatchOfUsers(Math.min(batchSize, volOfUsersToAdd - batchSize));
    // New step is to write these users to database
  }

  res.send('successful bulk add operation');
});
