const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const {Horas ,
       Usuario,
       Carreras,
       Clases,
       Citas} =  require('../db/indexDB');


const Getuser = async (req = request , resp = response)=>{


    try {
        const clase = await Citas.findAll({
        include : 
         [Usuario,Horas]
        
        
        });

        resp.json({
            msg : 'Todo ok ',
            clase });

    } catch (error) {
        console.log(error);
    }

   /*  try {
        const clase = await Clases.findAll({
        include : {
         model :  Horas
        }
        
        });

        resp.json({
            msg : 'Todo ok ',
            clase });

    } catch (error) {
        console.log(error);
    } */

    /* try {
        const usuario = await Usuario.findAll({
            where: {
                rol : 'TR'
        },
        
        include : {
         model :  Carreras
        }
        
        });

        resp.json({
            msg : 'Todo ok ',
            usuario });

    } catch (error) {
        console.log(error);
    } */


   /*  try {
    const horas = await Usuario.create({
        client_name : 'user7',
        num_identidad : 1287354,
        pass_client : '123456p',
        carrera_id : 5, 
        email :'user7@kevin.com',
        rol : 'TR'

    });
    horas.save();

    resp.json({msg : 'Todo ok ',
    horas });

} catch (error) {
console.log(error);    
} */
    
   /*  const horas = await Horas.create({
        hora_incio : '2:00',
        hora_final : '3:30'
    })
    horas.save(); */


};

const Postuser  = async (req = request , resp = response)=>{

    const {nombre,numIdentidad,password, tel ,carrera,email,rol} =  req.body;

resp.json({
    nombre,numIdentidad,password
});
};

const Putuser = ()=>{

};

const Deleteuser = ()=>{

};

module.exports ={
    Getuser,
    Postuser,
    Putuser,
    Deleteuser
}