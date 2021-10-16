const {DataTypes}= require('sequelize')
const { DB } = require('./connect')

const Clases = DB.define('Clase',{
    clase_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
nombre_clase : {
    type : DataTypes.STRING(200),
    allowNull : false
},
hora_id :{
    type : DataTypes.INTEGER.UNSIGNED // LLAVE FORANEA DE HORAS 
},
dia :{
    type: DataTypes.ENUM('PRO','TECN','EGRE','TRAB'),
    allowNull : true
}
});

module.exports = {
    Clases
}