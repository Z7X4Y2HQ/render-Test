require("dotenv").config();
const Note = require("./models/note");
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello!</h1>");
});
app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/notes/:id", (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/notes", (req, res, next) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "Empty",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });

  console.log(note);
});

app.put("/api/notes/:id", (req, res, next) => {
  const { content, important } = req.body;

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown Endpoint" });
};

app.use(unknownEndpoint);

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening to app by express on port ${port}`);
});
