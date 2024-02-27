const jwt = require('jsonwebtoken');
const { JWT_Token } = require('../models/models');

class TokenService {
  generateJWT(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '5m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '1d'});
  
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await JWT_Token.findOne({where: {userId}})
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await JWT_Token.create({refreshToken, userId})

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = JWT_Token.destroy({where: {refreshToken}})
    return tokenData;
  }

  validateRefreshToken(token) {
    try {
        const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return userData;
    } catch (error) {
        return null;
    }
  }

  validateAccessToken(token) {
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return userData;
    } catch (error) {
        return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await JWT_Token.findOne({where: {refreshToken}})
    return tokenData;
  }

}

module.exports = new TokenService();
