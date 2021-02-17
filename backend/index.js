'use strict';
require('dotenv').config();
const express = require('express');

const app = express();

app.get('/discord-auth', function (req, res) {
  console.log(req.body);
  res.end();
});

app.listen(process.env.PORT);
