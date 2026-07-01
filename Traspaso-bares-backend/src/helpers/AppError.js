class AppError extends Error {
  constructor(message, code, status = 400, fields = null) {
    super(message);
    this.code = code;
    this.status = status;
    this.fields = fields; 
  }
}

module.exports = AppError;
