const Sequelize = require('sequelize')
const db = require('../config/database')

const HOD = db.define('hods',{
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
    email:{
        type: Sequelize.TEXT,
        notEmpty: true
    },
    phone:{
        type: Sequelize.TEXT,
        notEmpty: true
    },
    course_code:{
        type: Sequelize.TEXT,
        notEmpty: true
    },
    avatar:{
        type:Sequelize.TEXT,
        notEmpty:true,
    },
    description:{
        type:Sequelize.TEXT,
        notEmpty:true,
    }
})

module.exports = HOD