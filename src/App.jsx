import { useState, useEffect } from "react";
import noteService from "./services/notes";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [toggleImp, setToggleImp] = useState(true);

  const addNoteToList = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((res) => setNotes(notes.concat(res)));
    setNewNote("");
  };

  const typeNoteByUser = (event) => {
    setNewNote(event.target.value);
  };

  useEffect(() => {
    console.log("effect");
    noteService.getNote().then((res) => setNotes(res));
  }, []);
  console.log("render", notes.length, "notes");

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((res) => setNotes(notes.map((n) => (n.id !== id ? n : res))));
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th className="tableRow">No.</th>
            <th className="tableRow">Content</th>
            <th className="tableRow">Important</th>
            <th className="tableRow">Toggle Important</th>
          </tr>
          {notes
            .filter((note) => (toggleImp ? note.important : notes))
            .map((note, i) => (
              <tr key={i}>
                <td className="tableRow">{i + 1}</td>
                <td className="tableRow" style={{ textAlign: "left" }}>
                  {note.content}
                </td>
                <td className="tableRow">{note.important ? "true" : "false"}</td>
                <td className="tableRow">
                  <button
                    onClick={() => {
                      toggleImportanceOf(note.id);
                    }}
                  >
                    {note.important ? "Ditch" : "Love"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <form onSubmit={addNoteToList}>
        Note: <input value={newNote} onChange={typeNoteByUser} />
        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => {
          setToggleImp(!toggleImp);
        }}
      >
        Show Important
      </button>
    </>
  );
}

export default App;
