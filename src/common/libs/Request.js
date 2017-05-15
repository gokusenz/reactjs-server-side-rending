import axios from 'axios';

const config = { timeout: 5000 };

export default {
  get: (url, params = {}) => axios.get(url, Object.assign({ params }, config)),
  post: (url, data = {}) => axios.post(url, data, config),
};
