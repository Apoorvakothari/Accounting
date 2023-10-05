class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.code = "UNAUTHORIZED";
    this.status = 401;
  }
}

const unauthorizedError = (message) => {
  return new UnauthorizedError(message);
};

module.exports = unauthorizedError;
