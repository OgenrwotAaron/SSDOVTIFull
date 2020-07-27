const Sequelize = require('sequelize')
const db = require('../config/database')
const Users = require('./Users')

const Student = db.define('students',{
        id:{
            autoIncrement:true,
            primaryKey:true,
            type:Sequelize.INTEGER
        },
        fname:{
            type:Sequelize.TEXT,
            notEmpty:true,
        },
        lname:{
            type:Sequelize.TEXT,
            notEmpty:true,
        },
        phone:{
            type: Sequelize.TEXT,
            notEmpty: true
        },
        email:{
            type: Sequelize.TEXT,
            notEmpty: true
        },
        reg_number:{
            type:Sequelize.TEXT,
            notEmpty:true
        },
        course_code:{
            type:Sequelize.TEXT,
            notEmpty:true,
        },
        avatar:{
            type:Sequelize.TEXT,
            notEmpty:true,
        },
        status:{
            type:Sequelize.TEXT,
            notEmpty:true,
        },
        joined:{
            type:Sequelize.DATE,
            notEmpty:true,
        }
    },
    {
        underscore:true,
        freezeTableName:true
    }
)

module.exports = Student;