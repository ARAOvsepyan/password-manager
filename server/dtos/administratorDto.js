module.exports = class AdministratorDto {
  email;
  id;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
  }
}