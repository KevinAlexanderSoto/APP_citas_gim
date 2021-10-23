const express = require('express');
const cors = require('cors') ;
const {DB} = require('../db/connect') ;
class Server{

    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;

        //rutas
        this.Usuarios_RoutPath = '/gim/usuarios';//ok 
        this.Cita_RoutPath = '/gim/citas';//ok
        this.Login_RoutPath = '/gim/login';//ok
        this.Carrera_RoutPath = '/gim/carrera';//ok
        this.Clase_RoutPath = '/gim/clase';//ok 
        this.Hora_RoutPath = '/gim/hora';

        this.middlewares();
        this.dbConnection();
        this.routes();
    };

    routes(){
        this.app.use(this.Usuarios_RoutPath,require('../routes/user'));
        this.app.use(this.Cita_RoutPath,require('../routes/citas'));
        this.app.use(this.Login_RoutPath,require('../routes/login'));
        this.app.use(this.Carrera_RoutPath,require('../routes/carrera'));
        this.app.use(this.Clase_RoutPath,require('../routes/clase'));
        this.app.use(this.Hora_RoutPath,require('../routes/hora'));
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