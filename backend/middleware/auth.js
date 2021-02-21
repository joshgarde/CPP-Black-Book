'use strict';
const discord = require('../lib/discord');

async function checkAuth(req, res, next) {
  let auth = req.signedCookies.auth;
  if (!auth) return res.status(403).end();

  if (new Date(auth.expires_at) < Date.now()) {
    // Attempt to renew token
    try {
      auth = await discord.refreshAuth(auth);
      auth.expires_at = Date.now() + (expires_in * 1000);

      res.cookie('auth', auth, { signed: true });
    } catch (err) {   }

    res.cookie('auth', '', { signed: true });
  }

  req.auth = auth;
  next();
}

module.exports = checkAuth;
