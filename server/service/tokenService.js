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
      console.log('3');
      return userData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  async saveToken(administratorId, refreshToken) {
    const tokenData = await TokenModel.findOne({where: {administratorId}})
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({refreshToken, administratorId})

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = TokenModel.destroy({where: {refreshToken}})
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({where: {refreshToken}})
    return tokenData;
  }
  
}

module.exports = new TokenService();
