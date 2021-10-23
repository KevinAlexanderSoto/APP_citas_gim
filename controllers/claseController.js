const { response } = require("express");
const {Clases,Horas} = require('../db/indexDB');

const getclases = async(req , res = response)=>{

try {
    
    const clases = await Clases.findAll({
        include : {
            model : Horas,
        attributes : ['hora_incio','hora_final']}
    });

    res.json({
        msg : "todo OK",
        clases
    })

} catch (error) {
    console.log(error);
    res.status(500).json({
        msg : "error backend",
        at : "getclase"
    });
}


};
const crearclase = async(req , res = response)=>{
    const {nombre,horaid,dia} = req.body;

    try {
        const newcita = await Clases.create(
            {
                nombre_clase : nombre,
                hora_id : horaid,
                dia : dia
            }
        );
    newcita.save();
        

    res.status(201).json({
        msg : "todo ok",
        newcita
    });

    } catch (error) {
    console.log(error);
    res.status(500).json({
        msg : "error backend",
        at : "crearclase"
    });        
    }
    
};
const actuclase = async(req , res = response)=>{

    const {nombre,horaid,dia,idclase} = req.body;

    if (nombre!="noactu") {
        await Clases.update({
            nombre_clase : nombre
        },
        {
            where : {
                clase_id : idclase
            }
        }).catch(error=>{
            console.log(error);
            res.status(500).json('error update nombre')
        });
    };
     if (horaid != 000) {
        await Clases.update({
            hora_id : horaid
        },
        {
            where : {
                clase_id : idclase
            }
        }).catch(error=>{
            console.log(error);
            res.status(500).json('error update hora')
        });
     };

     if (dia != "ñ") {
         
        await Clases.update({
            dia : dia
        },
        {
            where : {
                clase_id : idclase
            }
        }).catch(error=>{
            console.log(error);
            res.status(500).json('error update dia')
        });
     };

     res.json({
         msg : "actualizacion OK "
     });

};

module.exports = {
    getclases,
crearclase,
actuclase

}
