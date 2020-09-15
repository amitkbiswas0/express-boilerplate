const users = require("./users/users.routes");

// bootstrap all routes
module.exports = (app) => {
  app.use("/api/v1/users", users);
};
