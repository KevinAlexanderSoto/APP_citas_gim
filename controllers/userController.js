const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
/* import { Sequelize } from 'sequelize'; */

const Getuser = (req = request , resp = response)=>{
resp.json({msg : 'Todo ok '});
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