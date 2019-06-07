const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
  getActions,
  addAction
};

function getActions() {
  return db("projects as p")
    .join("actions as a", "p.id", "a.project_id")
    .select(
      "a.id",
      "a.description",
      "a.completed as completed",
      "a.notes as notes",
      "p.name as name",
      "p.description as description"
    );
}

function addAction(action) {
  return db("actions").insert(action, "id");
}
