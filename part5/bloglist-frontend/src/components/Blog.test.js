import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  const blog = {
    title: 'Testing the blog title field',
    author: 'Testing the blog author field',
  };

  beforeEach(() => {
    container = render(<Blog blog={blog} removeBlog={() => {}} />).container;
  });

  test('renders title and author', () => {
    const title = screen.getByText('Testing the blog title field');
    const author = screen.getByText('Testing the blog author field');
    expect(title).toBeDefined();
    expect(author).toBeDefined();
  });

  test('after clicking show more, blog detail is displayed', () => {
    const button = container.querySelector('.btn-show-more');
    userEvent.click(button);

    const div = container.querySelector('.blog-detail');
    expect(div).toHaveStyle('display: block');
  });
});
