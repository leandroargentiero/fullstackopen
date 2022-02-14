import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((allBlogs) => setBlogs(allBlogs));
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;
