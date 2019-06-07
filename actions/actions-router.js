const router = require("express").Router();

const Actions = require("./actions-model.js");

function validateBody(req, res, next) {
  if (req.body && req.body.description && req.body.notes) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Please provide the name or description of project" });
  }
}

router.post("/", async (req, res) => {
  try {
    const action = await Actions.addAction(req.body);
    res.status(201).json(action);
  } catch (error) {
    res.status(500).json({
      message: "Error adding the action"
    });
  }
});

module.exports = router;
