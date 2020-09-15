// to generate this seed files, after setting up knex file, run
// $ knex migrate:make file_name
// $ knex migrate:latest

exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.text("first_name");
    table.text("last_name");
    table.unique(["first_name", "last_name"]);
    table.date("birthday").notNullable();
    table.float("height");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
