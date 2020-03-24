const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
  getProjects,
  getProjectById,
  addProject,
  getActions
};

function getProjects() {
  return db("projects");
}

function addProject(project) {
  return db("projects").insert(project, "id");
}

function getActions() {
  return db("actions");
}

function getProjectById(id) {
  return db("actions")
    .select("id", "description", "notes", "completed")
    .where("project_id", id);
}
