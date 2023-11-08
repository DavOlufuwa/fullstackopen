import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";


// const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    appendVote(state, action) {
      const changedAnecdote = action.payload;
      // const anecdoteToChange = state.find((a) => a.id === id);

      // const changedAnecdote = {
      //   ...anecdoteToChange,
      //   votes: anecdoteToChange.votes + 1,
      // };
      return state
        .map((anecdote) => (anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote ))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const allAnecdotes = getState().anecdotes

    const anecdoteToChange = allAnecdotes.find(anecdote => anecdote.id === id)

    const content = {
      ...anecdoteToChange, 
      votes : anecdoteToChange.votes + 1
    }

    const newAnecdote = await anecdoteService.updateCurrent(id, content)
    dispatch(appendVote(newAnecdote))
  }
}


export const { appendAnecdotes, setAnecdotes, appendVote } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
