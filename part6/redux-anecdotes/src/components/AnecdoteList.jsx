import { useDispatch, useSelector } from "react-redux";
import { setNotifications, unsetNotifications } from "../reducers/notificationReducer";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterValue = useSelector((state) => state.filter);

  const vote = (id, info) => {
    dispatch(voteAnecdote(id));    
    dispatch(setNotifications(` you have voted "${info}" `))
    setTimeout(()=> {
      dispatch(unsetNotifications())
    }, 5000)
  };

  
  return (
    <div>
      {anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filterValue)
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
