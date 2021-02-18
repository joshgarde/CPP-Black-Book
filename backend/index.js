'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { MongoClient } = require('mongodb');
const discord = require('./lib/discord');

const app = express();
const dbClient = new MongoClient(process.env.DATABASE_URL, {
  useUnifiedTopology: true
});

app.use(express.json());
app.use(cors());

app.post('/auth', async function auth(req, res) {
  if (req.body && typeof req.body.code === 'string') {
    let {code, redirectUri} = req.body;

    try {
      let discordAuth = await discord.authenticate(code, redirectUri);
      res.send({success: true, message: ''});
    } catch (err) {
      console.log(err);
      res.send({success: false, message: 'Discord request failed'})
    }
  } else {
    res.send({success: false, message: 'Code is invalid/missing'})
  }
});

dbClient.connect().then(() => {
  let port = process.env.PORT;
  app.listen(port);
  console.log(`Now listening on :${port}`);
}).catch((err) => {
  console.log(`Unable to connect to db: ${err}`);
});
