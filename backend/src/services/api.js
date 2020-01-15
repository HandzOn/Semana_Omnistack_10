const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

const githubApi = axios.create({
  baseURL: 'https://api.github.com'
});

module.exports = {api, githubApi};