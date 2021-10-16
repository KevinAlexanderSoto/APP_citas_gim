const {DataTypes}= require('sequelize')
const { DB } = require('./connect')

const Usuario = DB.define('Usuario',{
    client_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
client_name :{
type: DataTypes.STRING(40),
allowNull : false
},
num_identidad : {
    type : DataTypes.STRING(20),
    allowNull: false
},
pass_client :{
    type : DataTypes.STRING(40),
    allowNull : false
},
tel : {
    type : DataTypes.INTEGER(11)
},
carrera_id :{
    type : DataTypes.INTEGER.UNSIGNED,// ESTA ES LA LLEVE FORANEA EN MI TABLA 
    allowNull : false
},
email : {
    type : DataTypes.STRING(100),
    allowNull : false
},
activo : {
    type : DataTypes.TINYINT,
    defaultValue: 1,
    allowNull : false
},
rol :{
    type : DataTypes.ENUM('ES','EG','AD','TR'),
    allowNull : false
}
});

module.exports = {
    Usuario
}