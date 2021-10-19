const express = require('express');
const cors = require('cors') ;
const {DB} = require('../db/connect') ;
class Server{

    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;

        //rutas
        this.Usuarios_RoutPath = '/gim/usuarios'; 
        this.Cita_RoutPath = '/gim/citas';
        this.Login_RoutPath = '/gim/login';

        this.middlewares();
        this.dbConnection();
        this.routes();
    };

    routes(){
        this.app.use(this.Usuarios_RoutPath,require('../routes/user'));
        this.app.use(this.Cita_RoutPath,require('../routes/citas'));
        this.app.use(this.Login_RoutPath,require('../routes/login'));
    };

    middlewares(){
        this.app.use(cors());
        //servir contenido 
        this.app.use(express.static("public"));
        //serializar info entrante a json 
        this.app.use(express.json());
    
    };
    async dbConnection(){
        try {
            await DB.authenticate();
            console.log('database online');
        } catch (error) {
            throw new Error(error);
        }
        
        
    }
    listen(){
        this.app.listen(this.PORT);

        console.log('server corriendo en puerto '+ this.PORT);
    };

};

module.exports = Server;