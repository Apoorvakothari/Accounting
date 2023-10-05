const { logger } = require("../../config/logger.js");

const exitHandler = (server) => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (server, error) => {
  logger.error("An error occured:", error);
  exitHandler(server);
};

module.exports = unexpectedErrorHandler;
