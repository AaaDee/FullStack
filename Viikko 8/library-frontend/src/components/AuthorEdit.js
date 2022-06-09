import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorEdit = ({authors}) => {
  const [author, setAuthor] = useState(authors[0].name)
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const onSubmit = (event) => {
    event.preventDefault()
    console.log(year)
    editAuthor({variables: {name: author, setBornTo: parseInt(year)}})
    setAuthor('')
    setYear('')
  }

  return <div>
    <p>update year</p>
    <form onSubmit={onSubmit}>
      <select value={author} onChange={({ target }) => setAuthor(target.value)}>
        {authors.map(author => 
          <option value={author.name} key={author.name}>{author.name}</option>
        )}
      </select>
      <input type="number" value={year} onChange={({ target }) => setYear(target.value)}/>
      <button>update</button>
    </form>
  </div>
}

export default AuthorEdit
