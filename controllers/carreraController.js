const { response } = require("express");
const {Carreras} = require ('../db/carrera.js')

const getcarreras = async(req , res = response)=>{
   try {
    const carreras = await Carreras.findAll();
    res.json({
        carreras
    });
   
   } catch (error) {
       console.log(error)
       res.status(500).json({
           msg : 'internal error, hable con backend'
       })
   } 
};

const crearCarrera = async(req , res = response)=>{

const {nombre , tipo} = req.body;

try {
    const repetido = await Carreras.findOne({
        where : {
            nombre_carrera : nombre
        }
    })

    if (repetido) {
        return res.status(400).json({
            msg : 'carrera ya existe'
        })
    }

    await Carreras.create({
        nombre_carrera : nombre,
        tipo : tipo
    });

    res.status(201).json({msg : `carrera ${nombre} , fue creada correctamente`})
} catch (error) {
    console.log(error);
    res.status(500).json({msg : 'error backend '})
}
     

};


const actuCarrera = async(req , res = response)=>{

    const {idcarrera,nombre,tipo} = req.body;

    const actu = await Carreras.update({
        nombre_carrera : nombre,
        tipo : tipo
    },{
        where : {carrera_id : idcarrera}
    }).then(actu=>{
        res.status(201).json({
            msg : 'actualizado',
            carrera : actu});
    }).catch(error =>{
        console.log(error);
        res.status(500).json(
            {
                msg : 'actualizacion fallida'
            }
        )
    });

   
};


module.exports = {
    crearCarrera,
    getcarreras,
    actuCarrera
}