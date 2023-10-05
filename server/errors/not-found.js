class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.code = "NOT_FOUND";
    this.status = 404;
  }
}

const notFoundError = (message) => {
  return new NotFoundError(message);
};

module.exports = notFoundError;
