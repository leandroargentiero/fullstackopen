import { useState } from 'react';
import PropTypes from 'prop-types';

const AddBlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    addNewBlog(newBlog);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            title
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            author
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="title">
            url
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">add blog</button>
      </form>
    </div>
  );
};

AddBlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired,
};

export default AddBlogForm;
