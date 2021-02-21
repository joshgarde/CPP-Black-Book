'use strict';
require('dotenv').config();
const cookieParser = require('cookie-parser')
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cors({
  origin: process.env.FRONTEND_ENDPOINT,
  credentials: true
}));

app.use('/user', require('./routes/user'));
app.use('/servers', require('./routes/servers'));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(process.env.PORT);
  console.log(`Listening on :${process.env.PORT}`);
}).catch(() => {
  console.log(`Failed to start: ${err}`);
});
