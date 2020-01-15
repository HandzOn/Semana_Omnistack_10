const {githubApi} = require('../services/api');

const Dev = require('../models/Dev');

module.exports = {
  async store(request, response) {
    const {github_username, techs, latitude, longitude} = request.body;
    const techsArray = techs.split(',').map(tech => tech.trim());
    const {data: githubData} = await githubApi.get(`/users/${github_username}`);
    const {name = login, avatar_url, bio} = githubData;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };

    const dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });
    return response.json(dev);
  }
};