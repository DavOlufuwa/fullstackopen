import React from 'react'
import { useDispatch } from 'react-redux';


const App = () => {

  const dispatch = useDispatch()

  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const ok = () => {
    store.dispatch({
      type: "OK",
    });
  };

  const zero = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

export default App