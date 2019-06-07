const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
  getProjects,
  getActions,
  addProject
};

function getProjects() {
  return db("projects");
}

function addProject(project) {
  return db("projects").insert(project, "id");
}

function getActions() {
  return db("projects as p")
    .join("actions as a", "p.id", "a.project_id")
    .select(
      "a.id",
      "a.description as description",
      "a.completed as completed",
      "a.notes as notes",
      "p.name as name",
      "p.description as description"
    );
}
