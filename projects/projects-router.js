const router = require("express").Router();

const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

const Projects = require("./projects-model.js");

function validateBody(req, res, next) {
  if (req.body && req.body.name && req.body.description) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Please provide the name or description of project" });
  }
}

router.post("/", async (req, res) => {
  try {
    const project = await Projects.addProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Error adding the project"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving projects"
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  db("projects")
    .where("projects.id", id)
    .then(project => {
      if (project.length < 1) {
        res.status(404).json({
          message: `The project with the specified id: '${id}' does not exist.`
        });
      } else {
        db("actions")
          .select("id", "description", "notes", "completed")
          .where("project_id", id)
          .then(projectActions => {
            project = project[0];
            if (project.completed === 1) {
              project.completed = true;
            } else {
              project.completed = false;
            }
            projectActions.map(projectAction => {
              if (projectAction.completed === 1) {
                projectAction.completed = true;
              } else {
                projectAction.completed = false;
              }
            });
            project.actions = projectActions;
            res.status(200).json(project);
          });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;
