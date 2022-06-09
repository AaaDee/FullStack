import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_GENRES, BOOKS_IN_GENRE, ME } from "../queries";


const Recommended = (props) => {
  const [genre, setGenre] = useState('');
  const userQuery = useQuery(ME)
  const bookQuery = useQuery(BOOKS_IN_GENRE, {variables: { genre: genre }})

  if (!props.show || bookQuery.loading || useQuery.loading) {
    return null
  }
  if (!genre) {
    setGenre(userQuery.data.me.favoriteGenre)
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>your favourite genre: {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookQuery.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
