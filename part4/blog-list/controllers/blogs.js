/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const users = await User.find({}).populate('blogs');

  const blog = new Blog({
    title,
    url,
    likes,
    author,
    user: {
      username: users[0].username,
      name: users[0].name,
      id: users[0]._id,
    },
  });

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { body } = request;

  const blog = {
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findOneAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
