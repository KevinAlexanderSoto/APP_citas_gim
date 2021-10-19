const { response, request } = require('express');

const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const {Horas ,
       Usuario,
       Carreras,
       Clases,
       Citas} =  require('../db/indexDB');



const Getuser = async (req = request , resp = response)=>{
   const {offset=0 , limit=10 } = req.query;
   const desde = parseInt(offset);
   const hasta = parseInt(limit);
    try {
        const usuario = await Usuario.findAndCountAll({
            where: {
                activo : 1
        },
        
        include : {
         model :  Carreras,
         attributes : ["nombre_carrera","tipo"]
        },
        attributes : ["client_name","num_identidad","tel","email","rol"],
        offset: desde , limit : hasta 
        
        });

        resp.json({
            msg : 'Todo ok ',
            usuario });

    } catch (error) {
        resp.status(500).json({
            msg : 'error en SERVER'
             });
        console.log(error);
    } 


    /* 
 
   /*  const horas = await Horas.create({
        hora_incio : '2:00',
        hora_final : '3:30'
    })
    horas.save(); */


};

const Postuser  = async (req = request , resp = response)=>{

    const {nombre,numIdentidad,password, tel ,carrera,email,rol} =  req.body;

       //encriptar contraseña
       const salt = bcryptjs.genSaltSync(11);
       const hash = bcryptjs.hashSync(password,salt);
    
    try {
     
        const newuser = await Usuario.create({
            client_name : nombre,
            num_identidad : numIdentidad,
            pass_client : hash,
            carrera_id : carrera, 
            email : email,
            rol : rol,
            tel : tel
    
        });

        await newuser.save();

        console.log(newuser);//BORRAR ESTO

    } catch (error) {
        console.log(error);

        resp.status(500).json({
            msg :'error creando en db',
        });
    }
    
    resp.status(201).json({
        msg :'Creado Exitosamente'
    });
};

const Putuser = async (req = request , resp = response)=>{
    let {nombre , numIdentidad ,tel ,carrera,email,rol}= req.body;
    tel = parseInt(tel);
    const {id} = req.query;
    if (nombre !== 'noName') {
        await Usuario.update({client_name : nombre},{
            where : {
                client_id : id
            }
        
        })
    }

    if (numIdentidad !== 00) {
        await Usuario.update({num_identidad : numIdentidad},{
            where : {
                client_id : id
            }
        
        })
    }

    if (tel !== 111) {
        await Usuario.update({tel : tel},{
            where : {
                client_id : id
            }
        
        })
    }

    if (carrera !== 0) {
        await Usuario.update({carrera_id : carrera},{
            where : {
                client_id : id
            }
        
        })
    }

    if (email !== 'noemail@no.com') {
        await Usuario.update({email : email},{
            where : {
                client_id : id
            }
        
        })
    }

    if (rol !== 'no') {
        await Usuario.update({rol : rol},{
            where : {
                client_id : id
            }
        
        })
    }
    resp.json({
       msg : 'Actualizacion Correcta'
    })
};


const Deleteuser = async (req = request , resp = response)=>{

    const {data}=req.body;

    await Usuario.update({activo : 0},{
        where : {
            client_id : data
        }
    
    })

    resp.status(200).json({
        msg : 'OK , barrado'
    })
};

module.exports ={
    Getuser,
    Postuser,
    Putuser,
    Deleteuser
}