import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'Testing the blog title field',
    author: 'Testing the blog author field',
  };

  beforeEach(() => render(<Blog blog={blog} />).container);

  test('renders title and author', () => {
    screen.findAllByText('Testing the blog title field');
    screen.findAllByText('Testing the blog author field');
  });
});
