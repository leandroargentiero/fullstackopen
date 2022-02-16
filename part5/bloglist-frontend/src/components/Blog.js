import { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  const detailsVisibility = { display: detailsVisible ? '' : 'none' };

  const addNewLike = async () => {
    try {
      const storedUserData = window.localStorage.getItem('loggedInUser');
      const { token } = JSON.parse(storedUserData);

      const updatedBlog = await blogService.addNewLike(
        { ...blog, likes: likes + 1 },
        token
      );
      setLikes(updatedBlog.likes);
    } catch (err) {
      console.log(err);
    }
  };

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
          likes {likes}{' '}
          <button type="button" onClick={addNewLike}>
            like
          </button>
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
