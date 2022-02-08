const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

// Init and populate Test DB
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);

  // const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  // const promiseArray = blogObjects.map((blog) => blog.save());

  // await Promise.all(promiseArray);
});

describe('when there is initially some blogs saved', () => {
  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('verify if unique identifier is named id', async () => {
    const blogs = await helper.blogsInDb();

    blogs.forEach((blog) => expect(blog.id).toBeDefined);
  });

  test('verify if likes property is missing', async () => {
    const blogs = await helper.blogsInDb();

    blogs.forEach((blog) => expect(blog.likes).toBeDefined());
  });
});

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'A new test blog',
      author: 'Leaero',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 69,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    // check if blog is added
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    // check if blog is saved correctly
    const blogTitles = blogsAtEnd.map((b) => b.title);
    expect(blogTitles).toContain('A new test blog');
  });

  test('verify if backend responds with 400 on missing title and url properties', async () => {
    const newBlog = {
      author: 'Leaero',
      likes: 69,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('deletion of a blog post', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    console.log(blogToDelete);

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((b) => b.title);

    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'leaero',
      name: 'leandro',
      password: 'antwerpen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

// Kill DB Connection
afterAll(() => {
  mongoose.connection.close();
});
