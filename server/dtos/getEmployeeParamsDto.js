const UserDto = require("./employeeDto");

module.exports = class GetEmployeeParamsDto extends UserDto  {
  constructor(model) {
    super(model);
    this.email = model.email;
  }
}