require("dotenv").config();

// import libraries
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const cookieParser = require("cookie-parser");

// custom utils
const logger = require("./utils/logger");
const { ErrorHandler, catchError } = require("./utils/error");

// main app module
module.exports = async (modules) => {
  // initiate app
  const app = express();

  // show development logs to console
  app.use(morgan("dev"));
  // write all logs to file if in production
  if (process.env.NODE_ENV === "production") {
    app.use(
      morgan("common", {
        stream: fs.createWriteStream(
          path.join(__dirname, "logs", "access.log"),
          {
            flags: "a",
          }
        ),
      })
    );
  }

  // middleware
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "static")));

  // load all modules
  Object.values(modules).forEach((path) => {
    require(path)(app);
  });

  // error handler for all unknown routes
  app.all("*", (req, res, next) => {
    next(
      new ErrorHandler(`Can't find ${req.originalUrl} on this Server!`, 404)
    );
  });

  // catch all errors
  app.use(catchError);

  // run app
  app.listen(process.env.PORT, () => {
    logger.info(`Server Running @${process.env.HOST}:${process.env.PORT}`);
  });
};
