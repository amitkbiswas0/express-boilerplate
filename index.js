const logger = require("./utils/logger");
const MODULES = ["./api"];

// catches unhandledRejection and uncaughtException
// logs only in development
require("./server")(MODULES).catch((err) => {
  logger.error(err);
  process.exit(1);
});
