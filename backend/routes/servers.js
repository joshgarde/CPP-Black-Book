'use strict';
const express = require('express');
const auth = require('../middleware/auth');
const discord = require('../lib/discord');
const Server = require('../models/server');

const router = express.Router();

/* ---  Unprotected Paths --- */
router.get('/', async function getServers(req, res) {
  let results = await Server.find({}, ['_id']).exec();
  results = results.map(server => server._id);

  res.send({success: true, message: '', results});
});

router.get('/:serverId', async function getServerById(req, res) {
  let serverId = req.params.serverId;
  let server = await Server.findById(serverId, ['_id', 'inviteCode']).exec();

  if (!server)
    return res.status(404).send({success: false, message: 'Server not found.'});

  let invite = await discord.getInvite(server.inviteCode);
  invite.guild.approximate_presence_count = invite.approximate_presence_count;
  invite.guild.approximate_member_count = invite.approximate_member_count;

  return res.send({
    success: true,
    message: '',
    server: invite.guild
  });
});

/* ---  Protected Paths --- */
router.use(auth);

router.post('/', async function putServer(req, res) {
  let inviteCode = req.body.inviteCode;

  try {
    let invite = await discord.getInvite(inviteCode);

    if (invite.guild.approximate_member_count <= 7) {
      return res.status(400).send({
        success: false,
        message: 'In order to limit spam, servers require at least 7 members to be listed.'
      });
    }

    let server = new Server({
      name: invite.guild.name,
      description: invite.guild.description,
      inviteCode: inviteCode
    });

    await server.save();

    res.send({success: true, message: ''});
  } catch (err) {
    console.log(err.message)
    res.status(503).send({success: false, message: 'An unknown error occured.'});
  }
});

module.exports = router;
