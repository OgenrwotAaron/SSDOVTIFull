const Sequelize = require('sequelize')
const db = require('../config/database');

const Admin = db.define('admins',{
    id:{
        type:Sequelize.INTEGER,
        notEmpty:true,
        primaryKey:true,
    },
    fname:{
        type:Sequelize.TEXT
    },
    lname:{
        type:Sequelize.TEXT
    },
    email:{
        type:Sequelize.TEXT
    },
    phone:{
        type:Sequelize.TEXT,
        notEmpty:true
    },
    position:{
        type:Sequelize.TEXT
    },
    description:{
        type:Sequelize.TEXT
    },
    avatar:{
        type:Sequelize.TEXT
    }
})

module.exports = Admin