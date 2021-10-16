const {DataTypes}= require('sequelize')
const { DB } = require('./connect')

const Horas = DB.define('Hora',{
    hora_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
hora_incio : {
    type : DataTypes.TIME,
    allowNull : false 
},
hora_final :{
    type: DataTypes.TIME
}
},{
    // I don't want createdAt and updatedAt

    createdAt: false,

  updatedAt: false,
 });

module.exports = {
    Horas
}