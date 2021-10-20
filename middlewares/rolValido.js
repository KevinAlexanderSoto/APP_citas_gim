const { response } = require("express");


const rolADMIN = (req,res = response,next)=>{

    const {rol} = req.usuario

    if (rol != 'AD') {
        return res.status(401).json({msg : 'no esta autorizado para hacer esto, solo ADMIN'});
    }

next();
};


module.exports = {
    rolADMIN
}