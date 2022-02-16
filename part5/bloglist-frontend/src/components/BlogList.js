import PropTypes from 'prop-types';
import Blog from './Blog';

const sortDesc = (a, b) => {
  return b - a;
};

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => sortDesc(a.likes, b.likes))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BlogList;
