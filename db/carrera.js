const {DataTypes}= require('sequelize')
const { DB } = require('./connect')

const Carreras = DB.define('Carrera',{
    carrera_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
nombre_carrera : {
    type : DataTypes.STRING(100),
    allowNull : true
},
tipo :{
    type: DataTypes.ENUM('PRO','TECN','EGRE','TRAB'),
    allowNull : false
}
});

module.exports = {
    Carreras
}