const bcrypt = require('bcrypt')

class PasswordService {
  async generateHashPassword(password) {
    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    return hashPassword;
  }

  generatePassword() {
    return crypto.getRandomValues(new BigUint64Array(1))[0].toString(36);
  }
  
}

module.exports = new PasswordService();
