/* import { Sequelize } from "sequelize/types"; */
const {Sequelize} = require('sequelize');
const DB = new Sequelize(
    process.env.DATABASE_NAME,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,
    {
        host : process.env.DATABASE_HOST,
        dialect : 'mysql',
        /* logging : false */// para evitar que se vean los comandos sql en la consola  
    }
);
module.exports ={
    DB
}
