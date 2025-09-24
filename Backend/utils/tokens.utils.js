// utils/token.service.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { RefreshToken } = require('../models');

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const signAccessToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
  expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m',
  jwtid: crypto.randomUUID()
});

const signRefreshToken = (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
  expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '7d',
  jwtid: crypto.randomUUID()
});

// Save hashed token in DB
const saveRefreshToken = async (tokenPlain, userId) => {
  const tokenHash = hashToken(tokenPlain);
  const decoded = jwt.decode(tokenPlain);
  const expiresAt = new Date(decoded.exp * 1000);
  return await RefreshToken.create({
    token_hash: tokenHash,
    user_id: userId,
    expires_at: expiresAt
  })
};

const findRefreshTokenByPlain = async (tokenPlain) => {
  const tokenHash = hashToken(tokenPlain);
  return await RefreshToken.findOne({ where: { tokenHash } });
};

const revokeRefreshToken = async (tokenRecord, replacedByHash = null) => {
  tokenRecord.revoked = true;
  tokenRecord.replacedByTokenHash = replacedByHash;
  await tokenRecord.save();
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  hashToken,
  saveRefreshToken,
  findRefreshTokenByPlain,
  revokeRefreshToken
};
