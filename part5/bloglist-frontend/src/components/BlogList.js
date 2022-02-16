import PropTypes from 'prop-types';
import Blog from './Blog';

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BlogList;
