const { Sequelize, DataTypes } = require('sequelize');
const  {development}  = require('../../config/config')

const sequelize = new Sequelize(development)
db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, DataTypes)
db.Token = require('./token')(sequelize, DataTypes)
db.Trip = require('./trip')(sequelize, DataTypes)
db.Schedule = require('./schedule')(sequelize, DataTypes)
db.Review = require('./review')(sequelize, DataTypes)
db.Rating = require('./rating')(sequelize, DataTypes)

module.exports = db;
