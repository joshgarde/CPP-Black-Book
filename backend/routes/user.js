'use strict';
const express = require('express');
const discord = require('../lib/discord');

const router = express.Router();

router.get('/whoami', function (req,res) {

});

router.post('/auth', async function postAuth(req, res) {
  let {code, redirectUri} = req.body;

  try {
    let discordAuth = await discord.authenticate(code, redirectUri);

    res.cookie('auth', discordAuth, { signed: true });
    res.send({success: true, message: ''});
  } catch (err) {
    console.log(`Discord request failed: ${err.message}`);
    res.send({success: false, message: `Discord replied: ${err.response.data.error_description}`});
  }
});

module.exports = router;
