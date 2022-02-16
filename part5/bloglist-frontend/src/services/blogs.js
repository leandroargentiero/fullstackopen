import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addNewBlog = async (blog, token) => {
  try {
    const request = await axios.post(baseUrl, blog, {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${token}`,
      },
    });

    return request.data;
  } catch (err) {
    console.log(err);
  }

  return null;
};

const addNewLike = async (blog, token) => {
  try {
    const request = await axios.put(`${baseUrl}/${blog.id}`, blog, {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${token}`,
      },
    });

    return request.data;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export default { getAll, addNewBlog, addNewLike };
