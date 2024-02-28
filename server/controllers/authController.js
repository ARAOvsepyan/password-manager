const { AdministratorModel } = require("../models/models")
const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt')
const AdministratorDto = require("../dtos/administratorDto");
const tokenService = require("../service/tokenService");
const passwordService = require("../service/passwordService");

class AuthController {
    async singin(req, res, next) {
      try {
        const {email, password} = req.body;
        const condidate = await AdministratorModel.findOne({where: {email}});

        if (condidate) {
          return next(ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`))
        }

        const hashPassword = await passwordService.generateHashPassword(password);
        const user = await AdministratorModel.create({email, password: hashPassword});

        const administratorDto = new AdministratorDto(user.dataValues);

        const tokens = tokenService.generateJWT({...administratorDto});

        await tokenService.saveToken(administratorDto.id, tokens.refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        return res.json({...tokens})
      } catch (error) {
        return next(error)
      }
    }

    async login(req, res, next) {
      try {
        const {email, password} = req.body;

        const user = await AdministratorModel.findOne({where: {email}})

        if (!user) {
            return next(ApiError.BadRequest('Пользователь с таким email не найден'));
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            return next(ApiError.BadRequest('Неверный пароль'));
        }
        const administratorDto = new AdministratorDto(user.dataValues);
        const tokens = tokenService.generateJWT({...administratorDto});

        await tokenService.saveToken(administratorDto.id, tokens.refreshToken);
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

        const user = await AdministratorModel.findByPk(userData.id);
        const administratorDto = new AdministratorDto(user);
        const tokens = tokenService.generateJWT({...administratorDto});

        await tokenService.saveToken(administratorDto.id, tokens.refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json({...tokens, user: administratorDto});     
      } catch (error) {
        next(error)
      }
  }
}

module.exports = new AuthController()