const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const {Horas} =  require('../db/hora');
/* import { Sequelize } from 'sequelize'; */

const Getuser = async (req = request , resp = response)=>{

    const horas = await Horas.findAll();


resp.json({msg : 'Todo ok ',
horas });
};

const Postuser  = ()=>{

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