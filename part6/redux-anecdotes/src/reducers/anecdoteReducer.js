import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const updatedAnnecdote = action.payload;
      return state.map((a) =>
        a.id !== updatedAnnecdote.id ? a : updatedAnnecdote
      );
    },
    appendAnnecdote(state, action) {
      const content = action.payload;
      const newAnecdote = {
        content,
        id: getId(),
        votes: 0,
      };

      state.push(newAnecdote);
    },
    setAnecdotes(state, action) {
      return (state = action.payload);
    },
  },
});

export const { addVote, appendAnnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initaliazeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addNewAnecdote({
      content,
      id: getId(),
      votes: 0,
    });

    dispatch(appendAnnecdote(newAnecdote));
  };
};

export const addNewVote = (annecdote) => {
  return async (dispatch) => {
    const changedAnnecdote = {
      ...annecdote,
      votes: annecdote.votes + 1,
    };
    const { id } = changedAnnecdote;
    const updatedAnnecdote = await anecdoteService.updateAnecdote(
      id,
      changedAnnecdote
    );

    dispatch(addVote(updatedAnnecdote));
  };
};

export default anecdoteSlice.reducer;
