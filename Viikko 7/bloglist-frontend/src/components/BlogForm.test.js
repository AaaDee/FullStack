import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('Submitting a blog returns right data', () => {
  const addBlog = jest.fn();

  const { container } = render(<BlogForm addBlog={addBlog} />);

  let input = container.querySelector('#title-input');
  userEvent.type(input, 'testTitle');

  input = container.querySelector('#author-input');
  userEvent.type(input, 'testAuthor');

  input = container.querySelector('#url-input');
  userEvent.type(input, 'testUrl');

  const sendButton = screen.getByText('create');
  userEvent.click(sendButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0]).toStrictEqual({
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
  });
});
