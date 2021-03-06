import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints]= useState(new Array(props.anecdotes.length).fill(0))
  
  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    console.log(points)
  }

  const findMax = () => {
    var max = points[0]
    var maxIndex = 0

    for (var i = 1; i < points.length; i++) {
      if (points[i] > max) {
        maxIndex = i;
        max = points[i];
      }
    }
    return(maxIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>
        <button onClick={() => {setSelected(Math.floor(Math.random() * props.anecdotes.length))}}>
          next anecdote
        </button>
        <button onClick={handleVote}>
          vote
        </button>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[findMax()]}</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)