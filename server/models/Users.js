const Sequelize = require('sequelize');
const db = require('../config/database')
const Students  = require('./Students')
const Teachers = require('./Teachers')
const Admin = require('./Admins')

const User = db.define('users',{
        user_name:{
            type:Sequelize.TEXT,
            notEmpty:true,
            primaryKey:true,
        },
        password:{
            type: Sequelize.TEXT,
            notEmpty: true
        },
        role:{
            type:Sequelize.INTEGER
        }
    },
    {
        underscore:true,
        freezeTableName:true
    }
);

User.hasOne(Students,{ foreignKey:'reg_number'})
User.hasOne(Teachers,{ foreignKey:'phone'})
User.hasOne(Admin,{foreignKey:'phone'})

module.exports = User;