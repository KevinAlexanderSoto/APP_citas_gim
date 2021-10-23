const { response } = require("express");

const {Horas } =  require('../db/indexDB');

const gethoras = async(req , res = response)=>{
    
    try {
        const horas = await Horas.findAll();

        res.json({
            horas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : 'Error del servidor , hable con BackEnd',
            where : 'gethoras' });

       
    }
};
const crearhora = async(req , res = response)=>{

    const {hInicio,hFinal} = req.body;
try {
    const newhora = await Horas.create({
        hora_incio : hInicio,
        hora_final : hFinal 
    });

    await newhora.save();
    res.json({
        hora : newhora
    });
} catch (error) {
    
    console.log(error);    
    res.status(500).json({
        msg : 'Error del servidor , hable con BackEnd',
        where : 'crearhora' });

}
    
};
const actuhora = async(req , res = response)=>{

    const {hInicio,hFinal,hid} = req.body;

    try {
        const actu = await Horas.update(
{
    hora_incio : hInicio,
    hora_final : hFinal
},{
    where : {
        hora_id : hid
    }
});
if (actu == 1) {
    return res.json({
        mas : ' actualizado correctamente'
     });
         
}

return res.json({
    mas : 'NO actualizado,no hubieron cambios u otro problema '
 });
 
    } catch (error) {
        
    console.log(error);    
    res.status(500).json({
        msg : 'Error del servidor , hable con BackEnd',
        where : 'acturhora' });
    }

};

module.exports = {
    gethoras,
crearhora,
actuhora
}

