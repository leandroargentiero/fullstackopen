import PropTypes from 'prop-types';
import Blog from './Blog';

const BlogList = ({ username, blogs, handleLogout }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {`${username} logged in `}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  username: PropTypes.string.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default BlogList;
