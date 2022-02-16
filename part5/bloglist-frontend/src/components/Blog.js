import { useState } from 'react';
import PropTypes from 'prop-types';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  const detailsVisibility = { display: detailsVisible ? '' : 'none' };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button type="button" onClick={toggleVisibility}>
          {detailsVisible ? 'hide' : 'show'}
        </button>
      </div>
      <div style={detailsVisibility}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button type="button">like</button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
};

export default Blog;
