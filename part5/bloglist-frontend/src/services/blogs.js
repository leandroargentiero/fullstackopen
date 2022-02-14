import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addNewBlog = (blog, token) => {
  const request = axios.post(baseUrl, blog, {
    headers: {
      'content-type': 'application/json',
      authorization: `bearer ${token}`,
    },
  });

  return request.then((response) => response.data);
};

export default { getAll, addNewBlog };
