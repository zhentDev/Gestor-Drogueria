// services/auth.service.js
const jwt = require('jsonwebtoken');
const { User, RefreshToken } = require('../models');
const { signAccessToken, signRefreshToken, saveRefreshToken, findRefreshTokenByPlain, revokeRefreshToken, hashToken } = require('../utils/tokens.utils');
const AppError = require('../utils/appError.utils'); // or your error class

class AuthService {
  async login(username, password) {
    const Op = require('sequelize').Op;
    const user = await User.findOne({
      where: { 
        [Op.or]: [{ username }, { email: username }],
        is_active: true
      }
    }); 

    if (!user) throw new AppError('Credenciales inválidas', 401);

    const isValid = await user.validatePassword(password);
    if (!isValid) throw new AppError('Credenciales inválidas', 401);

    // payload minimal
    const payload = { userId: user.id, role: user.role };

    let accessToken;
    let refreshToken;
    
    try {
      accessToken = signAccessToken(payload);
      refreshToken = signRefreshToken({ userId: user.id, type: 'refresh' });
      await saveRefreshToken(refreshToken, user.id);
    } catch (err) {
      throw new AppError(`Error al generar tokens- (${err.message})`, 500);
    }
    
    // Persist hashed refresh token for revocation & rotation
    
    const { password: _, ...userSafe } = user.toJSON();
    return { user: userSafe, accessToken, refreshToken }
  }

  async refresh(refreshTokenPlain) {
    try {
      // 1) verify signature
      const payload = jwt.verify(refreshTokenPlain, process.env.REFRESH_TOKEN_SECRET);

      if (payload.type !== 'refresh') throw new AppError('Token inválido', 401);

      // 2) find persisted token
      const tokenRecord = await findRefreshTokenByPlain(refreshTokenPlain);
      if (!tokenRecord || tokenRecord.revoked) {
        // possible reuse -> revoke all tokens for this user as mitigation (optional)
        throw new AppError('Refresh token inválido o revocado', 401);
      }

      // 3) check user existence
      const user = await User.findOne({ where: { id: payload.userId, is_active: true } });
      if (!user) throw new AppError('Usuario no encontrado', 404);

      // 4) rotate: create new refresh token and revoke the old one
      const newRefreshToken = signRefreshToken({ userId: user.id, type: 'refresh' });
      await saveRefreshToken(newRefreshToken, user.id);

      // set replacedByTokenHash to new token's hash
      const newHash = hashToken(newRefreshToken);
      await revokeRefreshToken(tokenRecord, newHash);

      // 5) issue new access token
      const newAccessToken = signAccessToken({ userId: user.id, role: user.role });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken, user: { id: user.id, email: user.email, role: user.role } };
    } catch (err) {
      if (err.name === 'TokenExpiredError') throw new AppError('Refresh token expirado', 401);
      if (err.name === 'JsonWebTokenError') throw new AppError('Refresh token inválido', 401);
      throw err;
    }
  }

  async logout(refreshTokenPlain) {
    if (!refreshTokenPlain) return;
    const tokenRecord = await findRefreshTokenByPlain(refreshTokenPlain);
    if (tokenRecord && !tokenRecord.revoked) await revokeRefreshToken(tokenRecord);
    // controllers will clear cookie
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findByPk(userId);
    if (!user) throw new AppError('Usuario no encontrado', 404);

    const match = await user.validatePassword(currentPassword);
    if (!match) throw new AppError('Contraseña actual incorrecta', 401);

    await user.update({ password: newPassword });
    // Optionally revoke all refresh tokens for this user after password change:
    await RefreshToken.update({ revoked: true }, { where: { userId } });

    return { message: 'Contraseña actualizada correctamente' };
  }

  async getMe(userId) {
    const user = await User.findOne({
      where: { id: userId, is_active: true },
      attributes: { exclude: ['password'] }
    });
    if (!user) throw new AppError('Usuario no encontrado', 404);
    return user;
  }
}

module.exports = new AuthService();
