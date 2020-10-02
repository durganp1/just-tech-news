

// IMPORT THE SEQUELIZE CONSTRUCTOR FROM THE LIBRARY
const Sequelize = require('sequelize');

require('dotenv').config();

// CREATE CONNECTION TO OUR DATABASE, PASS IN YOUR MYSQL INFORMATION FOR USERNAME AND PASSWORD
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'
});


module.exports = sequelize;