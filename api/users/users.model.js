const Model = require("../../knex/knex");

class User extends Model {
  static get tableName() {
    return "users";
  }
}

module.exports = User;
