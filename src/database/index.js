const Sequelize = require('sequelize');

// TODO: This should be external config
const sequelize = new Sequelize('sqlite::memory:');


module.exports = sequelize;
