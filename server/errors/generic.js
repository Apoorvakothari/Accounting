class GenericError extends Error {
  constructor(message, name, code, status, error) {
    super(message);
    this.name = name;
    this.code = code;
    this.cause = error;
    this.status = status;
  }
}

const genericError = (message, name, code, status, error) => {
  return new GenericError(message, name, code, status, error);
};

module.exports = genericError;
