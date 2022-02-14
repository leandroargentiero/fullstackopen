import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);

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
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
    }
  };

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    );
  }

  return <BlogList username={user.name} blogs={blogs} />;
};

export default App;
