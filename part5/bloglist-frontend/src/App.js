import { useState, useEffect } from 'react';
import AddBlogForm from './components/AddBlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [user, setUser] = useState(null);
  const localStorageKey = 'loggedInUser';

  useEffect(() => {
    blogService.getAll().then((allBlogs) => setBlogs(allBlogs));
  }, []);

  useEffect(() => {
    const storedUserJSON = window.localStorage.getItem('loggedInUser');

    if (storedUserJSON) {
      const parsedUser = JSON.parse(storedUserJSON);
      setUser(parsedUser);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = await loginService({
        username,
        password,
      });

      setUser(loggedInUser);
      window.localStorage.setItem(
        localStorageKey,
        JSON.stringify(loggedInUser)
      );
      setUsername('');
      setPassword('');
    } catch (exception) {
      throw new Error(`Failed to login: ${exception}`);
    }
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem(localStorageKey);
      setUser(null);
    } catch (exception) {
      throw new Error(`Failed to logout: ${exception}`);
    }
  };

  const handleNewBlog = async (e) => {
    e.preventDefault();

    try {
      const storedUserData = window.localStorage.getItem('loggedInUser');
      const { token } = JSON.parse(storedUserData);

      const newBlogPost = await blogService.addNewBlog(
        {
          title,
          author,
          url,
        },
        token
      );
      setBlogs(blogs.concat(newBlogPost));
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      throw new Error(`Failed to add new blog: ${exception}`);
    }
  };

  if (user === null) {
    return (
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        setUser={setUser}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <>
      <BlogList
        username={user.name}
        blogs={blogs}
        handleLogout={handleLogout}
      />
      <AddBlogForm
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        handleNewBlog={handleNewBlog}
      />
    </>
  );
};

export default App;
