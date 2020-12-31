import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return(
      <button onClick={() => {props.setCounter(props.counter + 1)}}>
        {props.name}
      </button>
  )
}

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all
  const positive = props.good / all * 100

  if (all > 0) {
    return(
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine name = "good" value = {props.good}/>
            <StatisticsLine name = "neutral" value = {props.neutral}/>
            <StatisticsLine name = "bad" value = {props.bad}/>
            <StatisticsLine name = "all" value = {all}/>
            <StatisticsLine name = "average" value = {average}/>
            <StatisticsLine name = "positive (%)" value = {positive}/>
            </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <div>no feedback given</div>
    </div>
  )
} 

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name = "good" counter = {good} setCounter = {setGood} />
      <Button name = "neutral" counter = {neutral} setCounter = {setNeutral} />
      <Button name = "bad" counter = {bad} setCounter = {setBad} />
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
      </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)