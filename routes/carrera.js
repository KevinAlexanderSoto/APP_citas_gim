const {Router} = require('express');

const {body,check}= require('express-validator');
const { getcarreras, crearCarrera, actuCarrera } = require('../controllers/carreraController');

const router = new Router();

router.get('/',getcarreras);

router.post('/',crearCarrera);

router.put('/',actuCarrera);




module.exports = router;