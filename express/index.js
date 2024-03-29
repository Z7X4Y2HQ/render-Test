const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const url = "/api/notes/";

app.get("/", (req, res) => {
  res.send("<h1>Hello Niggers!</h1>");
});
app.get(url, (req, res) => {
  res.json(notes);
});

app.get(url + ":id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.statusMessage = `note ${id} doesn't exist`;
    res.status(404).end();
  }
});

app.delete(url + ":id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

const generateID = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post(url, (req, res) => {
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening to app by express on port ${port}`);
});
