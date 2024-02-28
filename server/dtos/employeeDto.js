module.exports = class EmployeeDto {
  #email;
  #login;
  #password;
  #last_name;
  #first_name;
  #patronymic;
  #position;
  #departament;

  constructor(model) {
    this.last_name = model.last_name;
    this.first_name = model.first_name;
    this.patronymic = model.patronymic;
    this.position = model.position;
    this.departament = model.departament;
  }

  addLogInInfo(model) {
    this.email = model.email;
    this.login = model.login;
    this.password = model.password;
  }
}