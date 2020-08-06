const Sequelize = require('sequelize');
const db = require('../config/database')
const CourseModules = require('./CourseModules');
const HOD = require('./HODS');

const Course = db.define('courses',{
    name:{
        type:Sequelize.TEXT,
        notEmpty:true
    },
    code:{
        type:Sequelize.TEXT,
        notEmpty:true,
        primaryKey:true,
    },
    cover:{
        type:Sequelize.TEXT,
    },
    description:{
        type:Sequelize.TEXT,
    },
    phases:{
        type:Sequelize.INTEGER,
        notEmpty:true
    },
    modules:{
        type:Sequelize.INTEGER,
        notEmpty:true
    },
    duration:{
        type:Sequelize.INTEGER,
        notEmpty:true
    }
},
{
    underscore:true,
    freezeTableName:true
})

Course.hasMany(CourseModules,{
    foreignKey:'course_code',
    as:'courseModules'
})

module.exports = Course