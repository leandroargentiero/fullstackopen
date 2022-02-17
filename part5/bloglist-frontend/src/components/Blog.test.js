import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  test('renders title and author', () => {
    const blog = {
      title: 'Testing the blog title field',
      author: 'Testing the blog author field',
    };

    render(<Blog blog={blog} removeBlog={() => {}} />);

    const title = screen.getByText('Testing the blog title field');
    const author = screen.getByText('Testing the blog author field');
    expect(title).toBeDefined();
    expect(author).toBeDefined();
  });
});
