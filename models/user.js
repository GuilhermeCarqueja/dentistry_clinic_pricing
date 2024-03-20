const Sequelize = require('sequelize')
const database = require('../db/db')

const User = database.define(
    'user',
    {
        user_id:{
            type: Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },

        user_street:{
            type: Sequelize.STRING(200),
            allowNull:false

        },

        user_email:{
            type: Sequelize.STRING(100),
            allowNull:false

        },

        user_type:{
            type: Sequelize.CHAR(1),
            allowNull:false

        },

        user_name:{
            type: Sequelize.STRING(300),
            allowNull:false

        },

        zip_code:{
            type: Sequelize.CHAR(8),
            allowNull:false

        },

        addres_complement:{
            type: Sequelize.STRING(200),
            allowNull:false

        },

    }
)

module.exports = User