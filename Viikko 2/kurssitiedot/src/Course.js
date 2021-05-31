import React from 'react'

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Contents parts = {course.parts} />
      <Total  parts = {course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Contents = (props) => {
  console.log(props)
  return (
    <ul>
      {props.parts.map(part => 
        <li key = {part.id}>
          <Part part = {part}/>
        </li>
      )}
    </ul>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises
  return (
    <div>
      <p>Number of exercises {props.parts.reduce(reducer, 0)}</p>
    </div>
  )
}

export default Course