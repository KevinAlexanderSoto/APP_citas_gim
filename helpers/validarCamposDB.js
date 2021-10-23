
const {Usuario,Carreras,Horas,Clases} = require('../db/indexDB');

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
            num_identidad : user,
            activo : 1
        }});
        if (result == null) {
            throw new Error('Usuario No existe');
        }
    }; 

    const existeHora = async(id)=>{

        if (id !== 000) {// para manejar si la hora no se quiere actualizar
            const result = await Horas.findOne({where:{
                hora_id : id
            }});
            if (result == null) {
                throw new Error('Horas No existe, verifique el ID');
            }    
        }
        
    }

    const existeClase = async(id)=>{

        
            const result = await Clases.findOne({where:{
                clase_id : id
            }});
            if (result == null) {
                throw new Error('clase No existe, verifique el ID');
            }    
       
        
    }

module.exports = {
    existeNum,
    existeCarrera,
    existeEmail,
    existeUsuario,
    existeHora,
    existeClase
};