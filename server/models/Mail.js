const Sequelize = require('sequelize')
const db = require('../config/database')

const Mail = db.define('mails',{
    id:{
        autoIncrement:true,
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    sender:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    subject:{
        type:Sequelize.STRING
    },
    body:{
        type:Sequelize.STRING
    },
    seen:{
        type:Sequelize.INTEGER
    }
})

module.exports = Mail