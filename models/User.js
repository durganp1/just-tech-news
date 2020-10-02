

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');
const bcrypt = require('bcrypt');

// CREATE OUR USER MODEL
class User extends Model{
    // SET UP METHOD TO RUN ON INSTANCE DATA (PER USER) TO CHECK PASSWORD
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
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