import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  let anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdote = anecdotes.find(anecdote => anecdote.id === id);
    dispatch(updateNotification(`you voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(updateNotification(''))
    }, "5000")
  }

  console.log('anecdotes', anecdotes)
  anecdotes = anecdotes.filter(anecdote =>  {
    return anecdote.content.includes(filter.value);
  })
  anecdotes.sort((a, b) => b.votes - a.votes)

  return anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList