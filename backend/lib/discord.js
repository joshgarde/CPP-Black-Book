'use strict';
const axios = require('axios');
const qs = require('qs');

const DISCORD_ENDPOINT = 'https://discord.com/api/v8';
const DISCORD_ID = process.env.DISCORD_ID;
const DISCORD_SECRET = process.env.DISCORD_SECRET;

const instance = axios.create({
  baseURL: DISCORD_ENDPOINT
});

module.exports = {
  async authenticate(code, redirectUri) {
    let requestData = qs.stringify({
      client_id: DISCORD_ID,
      client_secret: DISCORD_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      scope: 'identify guilds'
    });

    let response = await axios.post(`${DISCORD_ENDPOINT}/oauth2/token`, requestData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    return response.data;
  }
}
