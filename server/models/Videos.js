const Sequelize = require('sequelize');
const db = require('../config/database');
const File = require('./Files')

const Video = db.define('videos',{
    id:{
        autoIncrement:true,
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    name:{
        type:Sequelize.TEXT,
        notEmpty:true
    },
    description:{
        type:Sequelize.TEXT,
    },
    transcript:{
        type:Sequelize.TEXT,
        notEmpty:true
    },
    unit_code:{
        type:Sequelize.TEXT,
        notEmpty:true
    },
    url:{
        type:Sequelize.TEXT,
        notEmpty:true
    }
})

Video.hasMany(File,{
    foreignKey:'video_id'
})

module.exports = Video