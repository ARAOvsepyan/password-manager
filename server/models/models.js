const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Users = sequelize.define('users', {
  id: {type: DataTypes.UUID ,primaryKey: true, defaultValue: DataTypes.UUIDV1},
  email: {type: DataTypes.STRING, allowNull: false, unique: true},
  password: {type: DataTypes.STRING, allowNull: false},
})

const JWT_Token = sequelize.define('jwt_tokens', {
  refreshToken: {type: DataTypes.STRING, allowNull: false}
})

const Users_Info = sequelize.define('users_info', {
  id: {type: DataTypes.INTEGER ,autoIncrement: true ,primaryKey: true},
  last_name: {type: DataTypes.STRING(50), allowNull: false},
  first_name: {type: DataTypes.STRING(50), allowNull: false},
  patronymic: {type: DataTypes.STRING(50), allowNull: false},
  position: {type: DataTypes.STRING(50), allowNull: false},
  departament: {type: DataTypes.STRING(50), allowNull: false}
})

Users.hasOne(JWT_Token, {
  foreignKey: {
    type: DataTypes.UUID
  }
});

Users.hasOne(Users_Info, {
  foreignKey: {
    type: DataTypes.UUID
  }
});

module.exports = { Users, JWT_Token, Users_Info }