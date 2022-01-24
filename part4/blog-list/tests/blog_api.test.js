const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

// Init and populate Test DB
beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('verify if unique identifier is named id', async () => {
  const blogs = await helper.blogsInDb();

  blogs.forEach((blog) => expect(blog.id).toBeDefined);
});

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

test('verify if likes property is missing', async () => {
  const blogs = await helper.blogsInDb();

  blogs.forEach((blog) => expect(blog.likes).toBeDefined());
});

// Kill DB Connection
afterAll(() => {
  mongoose.connection.close();
});

test('verify if backend responds with 400 on missing title and url properties', async () => {
  const newBlog = {
    author: 'Leaero',
    likes: 69,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});
