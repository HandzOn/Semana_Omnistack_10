const {githubApi} = require('../services/api');
const parseStringAsArray = require('../utils/parseStringAsArray');
const Dev = require('../models/Dev');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    const {github_username, techs, latitude, longitude} = request.body;
    const techsArray = parseStringAsArray(techs);

    let dev = await Dev.findOne({github_username});
    if (!dev) {
      const {data: githubData} = await githubApi.get(`/users/${github_username}`);
      const {name = login, avatar_url, bio} = githubData;

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }
    return response.json(dev);
  }
};