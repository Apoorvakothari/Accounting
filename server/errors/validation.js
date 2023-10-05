class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.code = "VALIDATION_ERROR";
    this.status = 400;
  }
}

const validationError = (error) => {
  const message = error?.errors?.map((err) => err.message).join(", ");

  return new ValidationError(message);
};

module.exports = validationError;
