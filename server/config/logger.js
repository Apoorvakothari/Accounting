const winston = require("winston");

const env = require("./env");

const isDevelopmentEnv = env.env === "development";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
});

const debug = (message) => {
  if (isDevelopmentEnv) {
    logger.info(message);
  }
};

const routeLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};

module.exports = {
  logger,
  debug,
  routeLogger,
};
