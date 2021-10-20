const { response, request } = require('express');

const {Horas ,
    Usuario,
    Carreras,
    Citas} =  require('../db/indexDB');


const Getcitas = async(req = request,res = response)=>{ // solo las citas de este user

   const {client_id} = req.usuario;

    try {
        const clase = await Citas.findAndCountAll({
            where : {client_id : client_id},
        include : [{ //JOIN ANIDADO :0
            model : Usuario,
            required: true, 
            attributes :["client_name","num_identidad","tel","email","rol","carrera_id"],
           include : {//include : { all: true, nested: true },//BUSCAR TODO RECURSIVAMENTE
               model : Carreras,
               attributes : ['nombre_carrera','tipo']
           }
        },
        {model : Horas,
        required: true,
        attributes : ['hora_incio','hora_final']
        }
    ],
         attributes : ['cita_id','fecha','asistencia'],
         required: true,
         offset: 0, limit : 20 
        
        
        });

        res.json({
            msg : 'Todo ok ',
            clase });

    } catch (error) {

        res.status(500).json({
            msg : 'Error del servidor , hable con BackEnd',
            where : 'getcitas' });

        console.log(error);
    }

};
//TODO: Hacerlo por fechas , o sea por dia 
const GetcitasAdmin = async(req = request,res = response)=>{// obtiene todas las citas 

    const {year,month,day} = req.params
 
     try {
         const clase = await Citas.findAndCountAll({
         include : [{ //JOIN ANIDADO :0
             model : Usuario,
             required: true, 
             attributes :["client_name","num_identidad","tel","email","rol","carrera_id"],
            include : {//include : { all: true, nested: true },//BUSCAR TODO RECURSIVAMENTE
                model : Carreras,
                attributes : ['nombre_carrera','tipo']
            }
         },
         {model : Horas,
         required: true,
         attributes : ['hora_incio','hora_final']
         }
     ],
          attributes : ['cita_id','fecha','asistencia'],
          required: true,
          offset: 0, limit : 20 
         
         
         });
 
         res.json({
             msg : 'Todo ok ',
             clase });
 
     } catch (error) {
 
         res.status(500).json({
             msg : 'Error del servidor , hable con BackEnd',
             where : 'getcitas' });
 
         console.log(error);
     }
 
 };

const Postcitas  = async(req = request,res = response)=>{
    const {fecha , horaID } =  req.body;
    const {client_id} = req.usuario;

    try {
     
        const newcita = await Citas.create({
            client_id : client_id,
            fecha : fecha,
            hora_id : horaID,
            
        });

        await newcita.save();

        console.log(newcita);//BORRAR ESTO

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg :'error creando en db',
        });
    }
    
    res.status(201).json({
        msg :'Creada Exitosamente'
    });

};

const Putcitas = async(req = request,res = response)=>{
const {asis} = req.query;
const {horaID,data,idcita} = req.body;

try {
    const {client_id} = await Usuario.findOne({
        where : {
            num_identidad: data
        }});
    
    if (horaID !== 000) {

        const cita = await Citas.update({
            asistencia : asis,
            hora_id : horaID
        },{
            where : {
                client_id : client_id,
                cita_id : idcita
            }
        
        });

        if (cita == 0) {

            return res.status(400).json({
                msg :'No se encontro la cita'
            });
                
        };
        return res.status(200).json({
            msg :'Actualizada Exitosamente'
        });
        
    };
    
    const ci = await Citas.update({
        asistencia : asis,
    },{
        where : {
            client_id : client_id,
            cita_id : idcita
        }
    
    });

    console.log(ci);
    if (ci == 0) {
        return res.status(400).json({
            msg :'No se encontro la cita - mire num identidad o id cita '
        });
    }

    return res.status(200).json({
        msg :'Actualizada Exitosamente'
    });

} catch (error) {
    console.log(error);
    res.status(500).json({
        msg : 'Error del servidor , hable con BackEnd',
        where : 'dactucita' });
}

};

const Deletecitas = async(req = request,res = response)=>{
res.status(500).json({
    msg : 'ESTO NO ESTA ECHO , falta implementar'
})
};

module.exports ={
    Getcitas,
    GetcitasAdmin,
    Postcitas,
    Putcitas,
    Deletecitas,
}