const {Router} = require('express');

const {body,check}= require('express-validator');
const { getclases, crearclase, actuclase } = require('../controllers/claseController');
const { validarJWT } = require('../helpers/GenValidatorJWT');
const { existeHora, existeClase } = require('../helpers/validarCamposDB');
const { validarDia } = require('../helpers/validarENUM');
const { rolADMIN } = require('../middlewares/rolValido');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

router.get('/',[validarJWT,
],getclases);

router.post('/',[validarJWT,
    rolADMIN,
    body('nombre').isString().isLength({max : 200}).notEmpty(),
    body('horaid','id no valido').isInt().isLength({max : 10}),
    body('horaid').custom(existeHora),
    validarCampos,
    body('dia','debe se letra y no mayor a 2 letras').isLength({max :2}).isString(),
    body('dia').custom(validarDia),
validarCampos
],crearclase);

router.put('/',[validarJWT,
    rolADMIN,
    body('idclase').notEmpty().isInt(),
    body('idclase').custom(existeClase),
    validarCampos,
    body('nombre').default("noactu").isString().isLength({max : 200}).notEmpty(),
    body('horaid','id no valido').default(000).isInt().isLength({max : 10}),
    body('horaid').custom(existeHora),
    validarCampos,
    body('dia','debe ser solo una letra y String').default("ñ").isLength({max :1}).isString(),
    body('dia').custom(validarDia),
validarCampos],actuclase);




module.exports = router;