const { response, request } = require('express');

const {Horas ,
    Usuario,
    Carreras,
    Citas} =  require('../db/indexDB');

//TODO: Hacerlo por fechas , o sea por dia 
const Getcitas = async(req = request,res = response)=>{

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
         attributes : ['cita_id','fecha'],
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

};

const Putcitas = async(req = request,res = response)=>{

};

const Deletecitas = async(req = request,res = response)=>{

};

module.exports ={
    Getcitas,
    Postcitas,
    Putcitas,
    Deletecitas,
}