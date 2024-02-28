const { EmployeeModel } = require("../models/models")
const EmployeeDto = require("../dtos/employeeDto")
const GetEmployeeParamsDto = require('../dtos/getEmployeeParamsDto')
const employeeService = require("../service/employeeService")
const { Op } = require("sequelize")
const ApiError = require("../error/apiError")

class EmployeeController {
  async getAll(req, res, next){
    try {
      const where = {};
      
      const params = new GetEmployeeParamsDto(req.query);

      const page = req.query.page ? parseInt(req.query.page) : 1;
      const per_page = req.query.per_page ? parseInt(req.query.per_page) : 1;

      if (params.email) where.email = { [Op.iLike]: `${params.email}%` }
      if (params.first_name) where.first_name = { [Op.iLike]: `${params.first_name}%` }
      if (params.last_name) where.last_name = { [Op.iLike]: `${params.last_name}%` }
      if (params.patronymic) where.patronymic = { [Op.iLike]: `${params.patronymic}%` }
      if (params.position) where.position = { [Op.eq]: params.position }
      if (params.departament) where.departament = { [Op.eq]: params.departament }

      const employees = await EmployeeModel.findAndCountAll({
        where,
        offset: (page - 1) * per_page,
        limit: per_page,
      });


      if (employees.count <= 0) {
          return next(ApiError.NotFound('Сотрудник не найден'))
      }

      return res.json(employees)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next){
    try {
      const { id } = req.params;

      const employeeById = await EmployeeModel.findByPk(id)

      if (!employeeById) {
        return next(ApiError.NotFound('Сотрудник не найден'))
      }

      return res.json(employeeById)
    } catch (error) {
      next(error)
    }
  }
  
  async create(req, res, next){
    try {
      const user = new EmployeeDto(req.body);
      
      // Может ли быть 100% совпадение? (можно вносить паспортные данные в теории или создать роут для повторного создания)
      const condidate = await EmployeeModel.findOne({where: {
        [Op.and]: [
          {last_name: user.last_name},
          {first_name: user.first_name},
          {patronymic: user.patronymic}
        ]
      }});

      if (condidate) {
        return next(ApiError.BadRequest(`Такой пользователь уже существуеит`))
      }

      const loginInfo = await employeeService.generateLogInInfo(user.last_name, user.first_name, user.patronymic);
      user.addLogInInfo(loginInfo)

      const employee = await EmployeeModel.create(user)

      return res.json(employee)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next){
    try {
      const { id } = req.params;

      const employeeById = await EmployeeModel.findByPk(id)

      if (!employeeById) {
        return next(ApiError.NotFound('Сотрудник не найден'))
      }

      const params = new GetEmployeeParamsDto(req.query);

      if (params.email) employeeById.email = params.email;
      if (params.first_name) employeeById.first_name = params.first_name;
      if (params.last_name) employeeById.last_name = params.last_name;
      if (params.patronymic) employeeById.patronymic = params.patronymic;
      if (params.position) employeeById.position = params.position;
      if (params.departament) employeeById.departament = params.departament;
      
      const updatedInfo = await employeeById.save();

      if(!updatedInfo) {
        return next(ApiError.BadRequest('Не удалось обновить'))
      }

      return res.json(updatedInfo)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next){
    try {
      const { id } = req.params;

      const employeeById = await EmployeeModel.findByPk(id)

      if (!employeeById) {
        return next(ApiError.NotFound('Сотрудник не найден'))
      }

      const deleteEmployee = await employeeById.destroy();

      if(!deleteEmployee) {
        return next(ApiError.BadRequest('Не удалось удалить'))
      }

      return res.json(deleteEmployee)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new EmployeeController()