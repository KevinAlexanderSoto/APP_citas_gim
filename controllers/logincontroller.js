const { response } = require("express");
const bcryptjs = require('bcryptjs');
const {Usuario} = require('../db/indexDB');
const { generarJWT } = require("../helpers/GenValidatorJWT");

const login = async(req , res = response)=>{

    const {email , password} =  req.body;
    try {

        const user = await Usuario.findOne({where : {email : email}});

        if (!user) {
        return res.status(401).json({msg : 'email o contraseña incorrecto o no registrado'});     
        }
        
        const {pass_client,client_id,activo} = user.dataValues;

        if (activo === 0) {
            return res.status(401).json({msg : 'user borrado'});
        };

    if (!pass_client) {
       return res.status(401).json({msg : 'email o contraseña incorrecto o no registrado'});
    }

    const validateP = bcryptjs.compareSync(password,pass_client);

    if (!validateP) {
        return res.status(401).json({msg : 'email o contraseña incorrecto o no registrado'});
    };

    generarJWT(client_id).then((token)=>{
        res.status(200).json({
            msg : 'login ok ',
            token
    });

    }).catch(err => {

        res.status(500).json('problemas con JWT , hable con BackEnd');
        console.log(err);
    })

    } catch (error) {

        res.status(500).json({msg : 'error login , hable con BackEnd'});
        console.log(error);
    }
    

};

module.exports = {
    login
}