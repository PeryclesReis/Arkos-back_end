const bodyParser = require('body-parser');
const express = require('express');
const router = require('../routes/routes');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);

app.use((err, _req, res, _next) => {
  console.log(err.message);
  return res.status(500).json({ message: 'Deu ruim alguma coisa aqui!'});
});

module.exports = app;
