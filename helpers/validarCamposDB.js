
const {Usuario,Carreras} = require('../db/indexDB');

const existeNum =  async (param)=>{

const result = await Usuario.findOne({where:{num_identidad : param}});

if (result) {
    throw new Error('campo repetido')
}

};


const existeCarrera =  async (param)=>{

    if (!param == 0) {
        const result = await Carreras.findOne({where:{carrera_id : param}});
        if (!result) {
            throw new Error('no existe esta carrera');
        }
    }
   
    
    };

    const existeEmail =  async (param)=>{

        const result = await Usuario.findOne({where:{email : param}});
        
        if (!result == null) {
            throw new Error('Ya esta registrado este email'+result);
        }
        
        };

    const existeUsuario = async(user)=>{
        const result = await Usuario.findOne({where:{
            client_id : user,
            activo : 1
        }});
        if (result == null) {
            throw new Error('Usuario No existe');
        }
    }; 

module.exports = {
    existeNum,
    existeCarrera,
    existeEmail,
    existeUsuario
};