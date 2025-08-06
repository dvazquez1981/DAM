
const  awdb=require('../bd/awdb.js');
const { Sequelize, DataTypes } = require('sequelize');


const Usuario= awdb.define('Usuario',{
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    name:{
        type: DataTypes.STRING,	
        primaryKey: true
    },
    password:{
        type: DataTypes.STRING,	
    },
    descrip:{
        type: DataTypes.STRING,
    },
    lastLogin:{
        type: Sequelize.DATE,
    },
    token:{
        type: DataTypes.STRING,
    }
} , {
    tableName: 'Usuario',
    timestamps: false
});

module.exports = Usuario ;
