const { Sequelize, DataTypes } = require('sequelize');
const  awdb=require('../bd/awdb.js');

/** Defino modelo de los datos */
const Log_Riego =awdb.define('Electrovalvulas',{
     logRiegoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
      },
      apertura: {
       type: DataTypes.INTEGER,
        allowNull: false
      },
      fecha: {
         type:  DataTypes.DATE,
        allowNull: false
      },     
       electrovalvulaId: {
       type: DataTypes.INTEGER,
        allowNull: false
      },

    }, {
    tableName: 'Log_Riegos',
    timestamps: false
});
module.exports = Log_Riego ;