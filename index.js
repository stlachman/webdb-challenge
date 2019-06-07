const express = require("express");

const server = express();

const projectsRouter = require("./projects/projects-router.js");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

server.use("/api/projects", projectsRouter);

const port = 5000;

server.listen(port, () => console.log(`Server listening on ${port}`));
