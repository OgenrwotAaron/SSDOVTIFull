const Sequelize = require('sequelize');
const db = require('../config/database');
const Video = require('./Videos')

const Unit = db.define('units',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
    },
    name:{
        type:Sequelize.TEXT,
        notEmpty:true,
        allowNull:false,
        trim:true,
        validate:{
            notNull:{msg:"Unit name is required"}
        }
    },
    code:{
        type:Sequelize.TEXT,
        notEmpty:true,
        allowNull:false,
        trim:true,
    },
    duration:{
        type:Sequelize.INTEGER,
        notEmpty:true,
    },
    module_code:{
        type:Sequelize.TEXT,
        notEmpty:true
    },
    description:{
        type:Sequelize.TEXT,
        notEmpty:true
    }
})

Unit.hasMany(Video,{
    foreignKey:'unit_code'
})

module.exports = Unit