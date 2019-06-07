const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

const port = 5000;

server.listen(port, () => console.log(`Server listening on ${port}`));
