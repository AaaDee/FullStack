const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require('apollo-server')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI =
 'mongodb+srv://CENSORED'
console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks (genre: String, author: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }


  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  },
  
`

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    allBooks: async (root, args) =>  {
      const filters = {}
      if (args.author) {
        filters.author = args.author
      }
      if (args.genre) {
        filters.genres = args.genre
      }
      console.log(filters)
      return await Book.find(filters).populate('author');
    },
    allAuthors: async () =>  {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async (root) => {
      const books = await Book.find({}, {genres: 1})
      const genreSet = new Set();
      books.forEach(book => {
        book.genres.forEach(genre => {
          genreSet.add(genre)
        })
      })

      return [...genreSet]
    }
  },
  Author: {
    bookCount: async (root) => await Book.find({author: root.name}).countDocuments()
  },
  Mutation: {
    addBook: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      
      try {
        let author = await Author.findOne({ name: args.author })
        console.log('authofound', author)
        if (!author) {
          author = new Author({name: args.author})
          console.log('author:', author)
          author = await author.save()
        }
        const book = new Book({
          ...args,
          author: author._id
        })
        console.log('book', book)
        book.save()
        console.log({
          ...book,
          author: author
        })
        return book.populate('author')
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, {currentUser}) => {

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        const author = await Author.findOneAndUpdate({name: args.name}, {born: args.setBornTo})
      return author;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({...args})
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})