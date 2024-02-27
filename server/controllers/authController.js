const { Users } = require("../models/models")
const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt')
const UserDto = require("../dtos/userDto");
const tokenService = require("../service/tokenService");

class AuthController {
    async singin(req, res, next) {
      try {
        const {email, password} = req.body;
        const condidate = await Users.findOne({where: {email}});

        if (condidate) {
          return next(ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`))
        }

        const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        const user = await Users.create({email, password: hashPassword});

        const userDto = new UserDto(user.dataValues);

        const tokens = tokenService.generateJWT({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        return res.json({...tokens})
      } catch (error) {
        return next(error)
      }
    }

    async login(req, res, next) {
      try {
        const {email, password} = req.body;

        const user = await Users.findOne({where: {email}})

        if (!user) {
            return next(ApiError.BadRequest('Пользователь с таким email не найден'));
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            return next(ApiError.BadRequest('Неверный пароль'));
        }
        const userDto = new UserDto(user.dataValues);
        const tokens = tokenService.generateJWT({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        return res.json({...tokens});
      } catch (error) {
        next(error)
      }
    }
    
    async logout(req, res, next) {
      try {
        const {refreshToken} = req.cookies;
        const token = await tokenService.removeToken(refreshToken);

        res.clearCookie('refreshToken');
        return res.json(token);
      } catch (error) {
        next(error)
      }
    }

    async refresh(req, res, next) {
      try {
        const {refreshToken} = req.cookies;

        if (!refreshToken) {
          return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await Users.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateJWT({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json({...tokens, user: userDto});     
      } catch (error) {
        next(error)
      }
  }
}

module.exports = new AuthController()