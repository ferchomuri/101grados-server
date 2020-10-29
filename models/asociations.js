var Sequelize = require('sequelize');
const Movie = require("./movie");
const Actor = require("./actor");

Movie.hasMany(Actor, {
    foreignKey: 'id',
    sourceKey: 'id'
  });

module.exports = {Movie, Actor}