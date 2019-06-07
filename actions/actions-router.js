const router = require("express").Router();

const Actions = require("./actions-model.js");

router.post("/", validateBody, async (req, res) => {
  try {
    const action = await Actions.addAction(req.body);
    res.status(201).json(action);
  } catch (error) {
    res.status(500).json({
      message: "Error adding the action"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.getActions();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving actions"
    });
  }
});

function validateBody(req, res, next) {
  if (req.body && req.body.description && req.body.notes) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Please provide the notes or description of action" });
  }
}

module.exports = router;
