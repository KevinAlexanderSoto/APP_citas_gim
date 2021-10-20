const jwt = require('jsonwebtoken');

var CryptoJS = require("crypto-js");

const { response } = require('express');
const { Usuario } = require('../db/usuario');

const generarJWT = (id = 'noid')=>{

    return new Promise((resolve,reject)=>{

        // encripta el id en para meterlo en el JWT
     const payload = CryptoJS.AES.encrypt(JSON.stringify(id),process.env.PRIVATEKEYENCRYPT).toString();
        
        jwt.sign({payload},process.env.PRIVATEKEYJWT,{
            expiresIn : "1 day",

        },(err,token) =>{

            if (err) {
                console.log(err);

                reject('no se segenero el JWT');
            }

            resolve(token);

        })


    });

};

const validarJWT = async ( req, res = response , next)=>{

    const token = req.header('x-token');
    try {
        // verificamos el JWT 
          const {payload} = jwt.verify(token , process.env.PRIVATEKEYJWT , (err,payload)=>{
            if (err) {
                return err;
            }
            return payload
            });
       
        // desdencriptado de usuario
        const idcryp = CryptoJS.AES.decrypt(payload,process.env.PRIVATEKEYENCRYPT);
        
        const id = idcryp.toString(CryptoJS.enc.Utf8);

        // se busca usuario en DB
        const user = await Usuario.findByPk(id);

        if (!user) {
            return res.status(400).json({msg : 'no hay usuario con este id'});
        }
       
        if (user.activo == 0) {
            return res.status(400).json({msg : 'usuario borrado'});
        }
        
        req.usuario = user;

        next();
        
    } catch (error) {
       return res.status(500).json({msg : 'ERROR EN VALIDAR JWT'});
        
        
    }


};


module.exports = {
    generarJWT,
    validarJWT
}