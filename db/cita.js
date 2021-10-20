const {DataTypes}= require('sequelize')
const { DB } = require('./connect')

const Citas = DB.define('Citas',{
    cita_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
client_id : {
    type : DataTypes.INTEGER.UNSIGNED, // LLAVE FORANEA DE cliente
    allowNull : false
},
fecha :{
    type : DataTypes.DATE,
    allowNull : false
},
hora_id :{
    type: DataTypes.INTEGER.UNSIGNED, // LLAVE FORANEA DE HORAS
    allowNull : false
},
asistencia : {
    type : DataTypes.TINYINT,
    defaultValue : 0
}
},{
    // I don't want createdAt and updatedAt

    createdAt: false,

  updatedAt: false,
 });

module.exports = {
    Citas
}