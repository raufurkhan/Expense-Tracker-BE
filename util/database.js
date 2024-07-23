const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense_tracker_website', 'root', 'Raufur123@', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
