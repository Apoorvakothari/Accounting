const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

import {
  errorConverter,
  errorHandler,
} from "../utils/error-handling/runtime-error-handler";

const app = express();

/* Parsers and security HTTP headers */
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Cors */
app.use(cors());
app.options("*", cors());

/* API routes */
app.use(`/api`, routes);

/* Error Handling */
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
