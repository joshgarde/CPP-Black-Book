'use strict';
const express = require('express');
const discord = require('../lib/discord');
const auth = require('../middleware/auth');

const router = express.Router();

/* ---  Unprotected Paths --- */

router.post('/auth', async function postAuth(req, res) {
  let {code, redirectUri} = req.body;

  try {
    let discordAuth = await discord.authenticate(code, redirectUri);
    discordAuth.expires_at = Date.now() + (expires_in * 1000);

    res.cookie('auth', discordAuth, { signed: true });
    res.send({success: true, message: ''});
  } catch (err) {
    console.log(`Discord request failed: ${err.message}`);
    res.send({success: false, message: `Discord replied: ${err.response.data.error_description}`});
  }
});

/* ---  Protected Paths --- */

router.use(auth);

router.get('/whoami', async function getWhoAmI(req, res) {
  try {
    let user = await discord.getUser(req.auth);
    res.send({ success: true, message: '', user});
  } catch (err) {
    res.send({ success: false, message: 'Unknown error occured'});
  }
});

router.get('/servers', async function getServers(req, res) {
  let guilds = await discord.getGuilds(req.auth);
  let servers = [];

  for (let guild of guilds) {
    let permissions = guild.permissions;

    if ((permissions & 0x01) === 0x01) {
      servers.push({
        id: guild.id, name: guild.name, icon: guild.icon
      });
    }
  }

  res.send({ success: true, message: '', servers });
})

module.exports = router;
