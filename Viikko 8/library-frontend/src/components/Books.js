import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_GENRES, BOOKS_IN_GENRE } from "../queries";


const Books = (props) => {
  const [genre, setGenre] = useState('');
  const bookQuery = useQuery(BOOKS_IN_GENRE, {variables: { genre }})
  const genreQuery = useQuery(ALL_GENRES)


  if (!props.show || bookQuery.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>genre: {genre}</p>
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
      {genreQuery.data.allGenres.map(genre => 
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>  
      )}
      <button  onClick={() => setGenre('')}>all genres</button>  
    </div>
  )
}

export default Books
