const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const people = [];

app.get("/", (req, res) => {
  res.json({ message: "🌎🌎" });
});

app.post("/person", (req, res) => {
  const { person } = req.body;
  people.push(person);
  res.json({ people: people });
});

app.listen(5000, () => {
  console.log("API Running at http://localhost:5000");
});
