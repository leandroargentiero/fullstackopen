import PropTypes from 'prop-types';
import Blog from './Blog';

const BlogList = ({ username, blogs }) => (
  <div>
    <h2>blogs</h2>
    <p>{`${username} logged in`}</p>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

BlogList.propTypes = {
  username: PropTypes.string.isRequired,
  blogs: PropTypes.arrayOf.isRequired,
};

export default BlogList;
