import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { TestBlog, TestUser } from './Blog.test.helpers';

test('renders author and title', () => {
  render(<Blog blog={TestBlog} user={TestUser} />);

  let element = screen.getByText('avaruuden korkeajännitys', { exact: false });
  expect(element).toBeDefined();

  element = screen.getByText('Rick Random', { exact: false });
  expect(element).toBeDefined();
});

test('likes and url are not rendered by default', () => {
  render(<Blog blog={TestBlog} user={TestUser} />);

  let element = screen.queryByText('miljoonavolttia.com', { exact: false });
  expect(element).toBeNull();

  element = screen.queryByText('Likes', { exact: false });
  expect(element).toBeNull();
});

test('expanding the view shows author and likes', () => {
  render(<Blog blog={TestBlog} user={TestUser} />);

  const button = screen.getByText('show');
  userEvent.click(button);

  let element = screen.getByText('miljoonavolttia.com', { exact: false });
  expect(element).toBeDefined();

  element = screen.getByText('Likes', { exact: false });
  expect(element).toBeDefined();
});

test('Clicking "Like" twice creates two calls', () => {
  const addLike = jest.fn();

  render(<Blog blog={TestBlog} user={TestUser} addLike={addLike} />);

  const button = screen.getByText('show');
  userEvent.click(button);

  const likeButton = screen.getByText('like');

  userEvent.click(likeButton);
  userEvent.click(likeButton);

  expect(addLike.mock.calls).toHaveLength(2);
});
