module.exports = class ApiError extends Error{
  status;
  errors;

  constructor(status, message, errors) {
      super(message);
      this.status = status;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  static NotFound(message) {
    return new ApiError(404, message);
  }

  static ServiceTemporarilyUnavailable(message) {
    return new ApiError(503, message);
  }
}
