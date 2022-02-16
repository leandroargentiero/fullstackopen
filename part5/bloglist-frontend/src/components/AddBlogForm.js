import PropTypes from 'prop-types';

const AddBlogForm = ({
  onSubmit,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
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
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  setAuthor: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
};

export default AddBlogForm;
