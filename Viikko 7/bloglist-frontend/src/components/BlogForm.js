import React, { useState } from 'react';

const BlogForm = props => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const onSubmit = async event => {
    event.preventDefault();
    const blog = {
      title: title,
      author: author,
      url: url,
    };
    props.addBlog(blog);

    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        title
        <input
          id="title-input"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id="author-input"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id="url-input"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="submit-blog" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
