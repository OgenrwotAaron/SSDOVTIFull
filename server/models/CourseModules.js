const Sequelize = require('sequelize');
const db = require('../config/database');
const Unit = require('./Units');

const CourseModules = db.define('modules',{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    name:{
        type:Sequelize.TEXT,
        notEmpty:true,
        allowNull:false,
        trim:true,
        validate:{
            notNull:{msg:"Module name is required"}
        }
    },
    code:{
        type:Sequelize.TEXT,
        notEmpty:true,
        allowNull:false,
    },
    description:{
        type:Sequelize.TEXT,
    },
    units:{
        type:Sequelize.INTEGER,
        notEmpty:true,
    },
    duration:{
        type:Sequelize.INTEGER,
        notEmpty:true,
    },
    phase:{
        type:Sequelize.INTEGER,
        notEmpty:true,
    },
    course_code:{
        type:Sequelize.TEXT,
        notEmpty:true,
    }
},
{
    underscore:true,
    freezeTableName:true
})

CourseModules.hasMany(Unit,{
    foreignKey:'module_code',
    as:'moduleUnits'
})

module.exports = CourseModules