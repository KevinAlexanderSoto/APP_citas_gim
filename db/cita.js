const {DataTypes}= require('sequelize')
const { DB } = require('./connect')

const Citas = DB.define('Cita',{
    cita_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
cliente_id : {
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
}
});

module.exports = {
    Citas
}