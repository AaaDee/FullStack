import { ALL_AUTHORS } from "../queries"
import { useQuery } from '@apollo/client'
import AuthorEdit from "./AuthorEdit.js"


const Authors = (props) => {
  const query = useQuery(ALL_AUTHORS)
  
  if (!props.show || query.loading) {
    return null
  }
  console.log(query.data.allAuthors)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {query.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>todo</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorEdit authors={query.data.allAuthors} />
    </div>
  )
}

export default Authors
