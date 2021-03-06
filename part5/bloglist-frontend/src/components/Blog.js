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

const Blog = ({ blog, removeBlog }) => {
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
        <span>{blog.title}</span>
        <span>{blog.author}</span>
        <button
          type="button"
          onClick={toggleVisibility}
          className="btn-show-more"
        >
          {detailsVisible ? 'hide' : 'show'}
        </button>
      </div>
      <div style={detailsVisibility} className="blog-detail">
        <div>{blog.url}</div>
        <div>
          likes {likes}{' '}
          <button type="button" onClick={addNewLike}>
            like
          </button>
        </div>
        <button type="button" onClick={() => removeBlog(blog.id)}>
          remove
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
