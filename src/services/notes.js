import axios from "axios";
const baseURL = "http://localhost:3001/api/notes/";

const getNote = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const create = (newNoteObject) => {
  return axios.post(baseURL, newNoteObject).then((res) => res.data);
};

const update = (id, updatedNote) => {
  return axios.put(baseURL + id, updatedNote).then((res) => res.data);
};

export default {
  getNote,
  create,
  update,
};
