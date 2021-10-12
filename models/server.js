const express = require('express');
const cors = require('cors') ;

class Server{

    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;

        //rutas
        this.Usuarios_RoutPath = 'gim/usuarios'; 
        this.Cita_RoutPath = 'gim/citas';

        this.middlewares();

        this.routes();
    };
    routes(){
        this.app.use(this.Usuarios_RoutPath,require('../routes/user'));
        this.app.use(this.Cita_RoutPath,require('../routes/citas'));
    };

    middlewares(){
        this.app.use(cors());
        //servir contenido 
        this.app.use(express.static("public"));
        //serializar info entrante a json 
        this.app.use(express.json());
    
    };
    listen(){
        this.app.listen(this.PORT);

        console.log('server corriendo en puerto'+this.PORT);
    }

};

module.exports = Server;