import React, { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, addLike }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [buttonText, setButtonText] = useState('show');
  const [removed, setRemoved] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleDetails = function () {
    setShowDetails(!showDetails);
    const text = showDetails ? 'show' : 'hide';
    setButtonText(text);
  };

  const handleLikeClick = function () {
    const updatedBlog = {
      id: blog.id,
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    };
    addLike(updatedBlog);
  };

  const remove = async function () {
    await blogService.remove(blog.id);
    setRemoved(true);
  };

  if (removed) {
    return null;
  }

  const isBlogCreatorLoggedIn = user.id === blog.user.id;

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author} &nbsp;
      <button id="blogToggle" onClick={toggleDetails}>
        {buttonText}
      </button>
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <p>
            likes: {blog.likes}
            &nbsp;
            <button id="like" onClick={handleLikeClick}>
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {isBlogCreatorLoggedIn && (
            <p>
              <button id="remove" onClick={remove}>
                Remove
              </button>
            </p>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func,
};

export default Blog;
