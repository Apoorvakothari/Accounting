const mongoose = require("mongoose");
const http = require("http");

const { createServer } = http;

const app = require("./config/app.js");
const env = require("./config/env.js");
const { logger } = require("./config/logger.js");
const unexpectedErrorHandler = require("./utils/error-handling/unexpected-error-handler.js");

const server = createServer(app);

// mongoose.connect(env.mongoose.url).then(async () => {
//   logger.info(`Connected to database`);

server.listen(env.port, () => {
  logger.info(`Server started at ${env.base.url} on port ${env.port}`);
});
// });

process.on("uncaughtException", (error) =>
  unexpectedErrorHandler(server, error)
);
process.on("unhandledRejection", (error) =>
  unexpectedErrorHandler(server, error)
);
