require('dotenv').config();

const server = require('./models/server');

const servidor = new server();

servidor.listen();