import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const message = useSelector(state => state.notification);
  console.log(message);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 5));
    }
  };

  const addBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      dispatch(setNotification(`blog ${returnedBlog.title} added`, 5));

      setBlogs(blogs.concat(returnedBlog));
    } catch (exception) {
      dispatch(setNotification('upload failed', 5));
    }
  };

  const addLike = async function (updatedBlog) {
    const uploadedBlog = await blogService.update(updatedBlog.id, updatedBlog);
    let updatedBlogs = blogs.filter(blog => blog.id !== updatedBlog.id);
    updatedBlogs = updatedBlogs.concat(uploadedBlog);
    setBlogs(updatedBlogs);
  };

  const logout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  if (user === null) {
    return (
      <div>
        <div>{message.value}</div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="submitLogin" type="submit">
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div>{message.value}</div>
      <h2>blogs</h2>
      <div>{user.username} Logged in</div>
      <button onClick={logout}>Logout</button>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} user={user} addLike={addLike} />
        ))}
      <Togglable buttonLabel="New Blog" id="newBlogToggle" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    </div>
  );
};

export default App;
