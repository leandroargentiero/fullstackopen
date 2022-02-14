/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');

const verifyToken = (token) => {
  let validToken = false;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (token || decodedToken.id) {
    validToken = true;
  }
  return { validToken, decodedToken };
};

blogsRouter.get('/', async (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

// eslint-disable-next-line consistent-return
blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const { validToken, decodedToken } = verifyToken(request.token);

  if (!validToken) {
    // 401 unauthorized
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title,
    url,
    likes,
    author,
    user: user._id,
  });

  try {
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save({ validateModifiedOnly: true });

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

// eslint-disable-next-line consistent-return
blogsRouter.delete('/:id', async (request, response, next) => {
  const { validToken } = verifyToken(request.token);

  if (!validToken) {
    // 401 unauthorized
    return response.status(401).json({ error: 'token missing or invalid' });
  }

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
