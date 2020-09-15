// to generate this seed files, after setting up knex file, run
// knex seed:make file_name
// seed files are ran in alphabetical order so name files accordingly

const data = require("../../static/MOCK_DATA.json");
const rows = [];

for (let value of Object.values(data)) rows.push(value);

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert(rows);
    });
};
