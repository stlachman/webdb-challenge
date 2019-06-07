const router = require("express").Router();

const Projects = require("./projects-model.js");

// router.post("/", (req, res) => {
//   const newProject = req.body;
//   Projects.addProject(newProject);
// });

function validateBody(req, res, next) {
  if (req.body && req.body.name && req.body.description) {
    next();
  } else {
    res.status(400).json({ message: "Please provide the name of the hub" });
  }
}

router.post("/", async (req, res) => {
  try {
    // validate body to make sure there is a name
    const project = await Projects.addProject(req.body);
    console.log(project);
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
  try {
    const { id } = req.params;
    const projects = await Projects.getProjects().where({ id });
    const actions = await Projects.getActions().where({ project_id: id });

    let result = {
      if(actions && actions.length > 0) {
        projects.actions = actions;

        return projects;
      }
      // projects,
      // ...actions
    };
    res.status(200).json(result);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error retrieving projects"
    });
  }
});

module.exports = router;
