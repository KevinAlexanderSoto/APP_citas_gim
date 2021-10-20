const {Router} =  require('express');
const {check, body}= require('express-validator');
const { login } = require('../controllers/logincontroller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();


router.post('/',[
    body('email').isEmail().isLength({max : 99}).not().isEmpty(),
    body('password','tiene que ser mas de 6 y menor que 40 caracters').isLength({min : 6 , max: 40}).not().isEmpty(),
    validarCampos
],login);



module.exports= router;