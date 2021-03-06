import { useState, useEffect, useRef } from 'react';
import AddBlogForm from './components/AddBlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({
    message: null,
    state: '',
  });
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
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

  const showNotification = (message, state) => {
    setNotification({
      ...notification,
      message,
      state,
    });
    setTimeout(() => {
      setNotification({ ...notification, message: null });
    }, 5000);
  };

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
      showNotification('wrong username or password', 'error');
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

  const addNewBlog = async (newBlogObject) => {
    try {
      const storedUserData = window.localStorage.getItem('loggedInUser');
      const { token } = JSON.parse(storedUserData);

      const newBlogPost = await blogService.addNewBlog(newBlogObject, token);
      setBlogs(blogs.concat(newBlogPost));
      showNotification(
        `A new blog ${newBlogPost.title} by ${newBlogPost.author} added.`,
        'success'
      );
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      showNotification('Failed to add new blog post');
    }
  };

  if (user === null) {
    return (
      <>
        {notification.message !== null && (
          <Notification
            message={notification.message}
            state={notification.state}
          />
        )}
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          handleLogin={handleLogin}
        />
      </>
    );
  }

  return (
    <>
      {notification.message !== null && (
        <Notification
          message={notification.message}
          state={notification.state}
        />
      )}
      <h2>blogs</h2>
      <p>
        {`${user.name} logged in `}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <AddBlogForm addNewBlog={addNewBlog} />
      </Togglable>
      <BlogList blogs={blogs} />
    </>
  );
};

export default App;
