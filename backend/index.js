'use strict';
require('dotenv').config();
const cookieParser = require('cookie-parser')
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET));

app.use('/user', require('./routes/user'));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(process.env.PORT);
  console.log(`Listening on :${process.env.PORT}`);
}).catch(() => {
  console.log(`Failed to start: ${err}`);
});
