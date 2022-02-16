import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';
import blogService from '../services/blogs';

const sortDesc = (a, b) => {
  return b - a;
};

const BlogList = ({ blogs }) => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    setAllBlogs(blogs);
  }, [blogs]);

  const removeBlog = async (blogId) => {
    try {
      const blog = allBlogs.find((b) => b.id === blogId);
      const storedUserData = window.localStorage.getItem('loggedInUser');
      const { token } = JSON.parse(storedUserData);

      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        const removedBlog = await blogService.removeBlog(blogId, token);

        if (removedBlog.status === 204) {
          setAllBlogs(allBlogs.filter((b) => b.id !== blogId));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {allBlogs
        .sort((a, b) => sortDesc(a.likes, b.likes))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
        ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BlogList;
