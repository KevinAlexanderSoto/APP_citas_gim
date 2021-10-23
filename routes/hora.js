const {Router} = require('express');

const {body,check}= require('express-validator');
const { gethoras, crearhora, actuhora } = require('../controllers/horaController');
const { validarJWT } = require('../helpers/GenValidatorJWT');
const { rolADMIN } = require('../middlewares/rolValido');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();


router.get('/',[
    validarJWT,
    rolADMIN,
],gethoras);

router.post('/',[
    validarJWT,
    rolADMIN,
    body('hInicio').matches('^(10|11|12|[1-9]):[0-5][0-9]$').notEmpty(),
    body('hFinal').matches('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$').notEmpty(),
validarCampos],crearhora);

router.put('/',[
    validarJWT,
rolADMIN,
body('hInicio','tiene que ser hora ej : "3:00"').matches('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$').notEmpty(),
body('hFinal','tiene que ser hora ej : "3:00"').matches('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$').notEmpty(),
body('hid','id no valido o no esta').isInt().notEmpty().isLength({max : 10}),
validarCampos],actuhora);

module.exports = router;