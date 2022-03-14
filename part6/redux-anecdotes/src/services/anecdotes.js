import axios from "axios";

const baseUrl = "http://localhost:3000/anecdotes";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const addNewAnecdote = async (data) => {
  try {
    const result = await axios.post(baseUrl, data);
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

const updateAnecdote = async (id, data) => {
  try {
    const result = await axios.put(`${baseUrl}/${id}`, data);
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export default { getAll, addNewAnecdote, updateAnecdote };
