const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const AdministratorModel = sequelize.define('administrator', {
  id: {type: DataTypes.UUID ,primaryKey: true, defaultValue: DataTypes.UUIDV1},
  email: {type: DataTypes.STRING, allowNull: false, unique: true},
  password: {type: DataTypes.STRING, allowNull: false},
})

const TokenModel = sequelize.define('jwt_token', {
  refreshToken: {type: DataTypes.STRING, allowNull: false}
})

const EmployeeModel = sequelize.define('employee', {
  id: {type: DataTypes.INTEGER ,autoIncrement: true ,primaryKey: true},
  email: {type: DataTypes.STRING, allowNull: false, unique: true}, 
  login: {type: DataTypes.STRING, allowNull: false, unique: true}, // Может стоит это вынести отделтно в общую таблицу с password
  password: {type: DataTypes.STRING, allowNull: false}, // Может стоит это вынести отделтно в общую таблицу с login
  last_name: {type: DataTypes.STRING, allowNull: false},
  first_name: {type: DataTypes.STRING, allowNull: false},
  patronymic: {type: DataTypes.STRING, allowNull: false},
  position: {type: DataTypes.STRING, allowNull: false}, // Стоит вынести отдельно
  departament: {type: DataTypes.STRING, allowNull: false} // Стоит вынести отдельно
})

AdministratorModel.hasOne(TokenModel, {
  foreignKey: {
    type: DataTypes.UUID
  }
});

module.exports = { AdministratorModel, TokenModel, EmployeeModel }