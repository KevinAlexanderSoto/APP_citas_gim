const {Usuario} = require ('./usuario');
const {Carreras} = require ('./carrera');
const {Citas} = require ('./cita');
const {Clases} = require ('./clase');
const {Horas} = require ('./hora');

Usuario.belongsTo(Carreras,{ foreignKey : "carrera_id"});
Carreras.hasMany(Usuario,{ foreignKey : "carrera_id"});

Clases.belongsTo(Horas,{foreignKey : "hora_id"});
Horas.hasMany(Clases,{foreignKey : "hora_id"});

Citas.belongsTo(Usuario , {foreignKey : "client_id"});
Usuario.hasOne(Citas,{foreignKey : "client_id"});

Citas.belongsTo(Horas,{foreignKey : "hora_id"});
Horas.hasMany(Citas,{foreignKey : "hora_id"});

module.exports = {
    Carreras,
    Usuario,
    Citas,
    Clases,
    Horas

}