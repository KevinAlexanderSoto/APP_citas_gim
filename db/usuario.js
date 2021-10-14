const {DataTypes}= require('sequelize')
const { DB } = require('./connect')

const Usuario = DB.define('Usuario',{
client_name :{
type: DataTypes.STRING,
allowNull : false
},
num_identidad : {
    type : DataTypes.STRING,
    allowNull: false
},
pass_client :{
    type : DataTypes.STRING,
    allowNull : false
},
tel : {
    type : DataTypes.INTEGER
},
carrera_id :{
    type : DataTypes.INTEGER.UNSIGNED,// ESTA ES LA LLEVE FORANEA EN MI TABLA 
    
}

});

module.exports = {
    Usuario
}