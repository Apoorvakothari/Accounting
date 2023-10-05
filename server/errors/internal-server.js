class InternalServerError extends Error {
  constructor(message, error) {
    super(message);
    this.name = "InternalServerError";
    this.code = "INTERNAL_SERVER_ERROR";
    this.cause = error;
    this.status = 500;
  }
}

const internalServerError = (message, error) => {
  return new InternalServerError(message, error);
};

module.exports = internalServerError;
