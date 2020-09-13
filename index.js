const logger = require("./utils/logger");
const MODULES = ["./routes"];

// catches unhandledRejection and uncaughtException
// logs only in development
require("./server")(MODULES).catch((err) => {
  logger.error(err);
  process.exit(1);
});
