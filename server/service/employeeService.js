const passwordService = require("./passwordService");

class EmployeeService {
  async generateLogInInfo(last_name, first_name, patronymic) {
    const login = last_name.toLowerCase() + first_name[0].toLowerCase() + patronymic[0].toLowerCase();
    const email = login + `@${process.env.MAIL_DOMEN}`;
    const password = await passwordService.generateHashPassword(passwordService.generatePassword());

    return {
      email,
      login,
      password,
    }
  }
  
}

module.exports = new EmployeeService();
