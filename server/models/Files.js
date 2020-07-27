const Sequelize = require('sequelize');
const db = require('../config/database')

const File = db.define('pdfs',{
    id:{
        autoIncrement:true,
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    name:{
        type:Sequelize.TEXT,
        notEmpty:true
    },
    url:{
        type:Sequelize.TEXT,
        notEmpty:true
    },
    video_id:{
        type:Sequelize.INTEGER,
        notEmpty:true
    }
})

module.exports = File