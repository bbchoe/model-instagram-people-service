const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.listen(port, () => console.log('Server listening on port: ', port));

app.use(morgan('dev'));
app.use(bodyParser.json());

app.put('/user/add', (req, res) => {
  console.log(req.body);
  res.send('received a PUT request');
});
