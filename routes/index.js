const users = require("./users");

// bootstrap all routes
module.exports = (app) => {
  app.use("/api/users", users);
};
