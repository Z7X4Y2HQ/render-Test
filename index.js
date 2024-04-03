require("dotenv").config();
const Note = require("./models/note");
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello Niggers!</h1>");
});
app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.statusMessage = `note ${id} doesn't exist`;
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

const generateID = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "Empty",
    });
  }

  const note = {
    id: generateID(),
    content: body.content,
    important: Boolean(body.important) || false,
  };
  notes = notes.concat(note);

  console.log(note);
  res.json(note);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening to app by express on port ${port}`);
});
