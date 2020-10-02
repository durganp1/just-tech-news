

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

// CREATE OUR USER MODEL
class User extends Model{}

// DEFINE TABLE COLUMNS AND CONFIGURATION
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS

        // PASS IMPORTED SEQUELIZE CONNECTION
        sequelize,
        // DONT AUTOMATICALLY CREATE CREATEDAT/UPDATED AT TIMESTAMP FIELDS
        timestamps: false,
        // DONT PLURALIZE NAME OF DATABASE TABLE
        freezeTableName: true,
        // USE UNDERSCORES INSTEAD OF CAMEL-CASING
        underscored: true,
        // MAKE IT SO OUR MODEL NAME STAYS LOWERCASE IN DATABASE
        modelName: 'user'
    }
);

module.exports = User;