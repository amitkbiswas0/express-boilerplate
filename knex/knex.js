require("dotenv").config();
const knex = require("knex");
const knexFile = require("../knexfile");
const { Model } = require("objection");

// create connection configuration using knexfile
const connectionConfig = knexFile[process.env.NODE_ENV];

// create knex file using config and pass to objection model
Model.knex(knex(connectionConfig));

module.exports = Model;
