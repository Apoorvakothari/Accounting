class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.code = "BAD_REQUEST";
    this.status = 400;
  }
}

const badRequestError = (message) => {
  return new BadRequestError(message);
};

module.exports = badRequestError;
    