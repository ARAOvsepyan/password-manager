const jwt = require('jsonwebtoken');
const { TokenModel } = require('../models/models');

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

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({where: {refreshToken}})
    return tokenData;
  }
  
}

module.exports = new TokenService();
