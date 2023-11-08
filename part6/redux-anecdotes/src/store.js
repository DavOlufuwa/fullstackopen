import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import anecdoteReducer from "./reducers/anecdoteReducer";


const store = configureStore({
  reducer: {
    filter: filterReducer,
    notification: notificationReducer,
    anecdotes: anecdoteReducer,
  },
});


export default store