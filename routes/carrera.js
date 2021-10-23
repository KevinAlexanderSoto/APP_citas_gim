const {Router} = require('express');

const {body,check}= require('express-validator');
const { getcarreras, crearCarrera, actuCarrera } = require('../controllers/carreraController');
const { validarJWT } = require('../helpers/GenValidatorJWT');
const { rolADMIN } = require('../middlewares/rolValido');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarTipo} = require('../helpers/validarENUM');
const {existeCarrera} = require('../helpers/validarCamposDB');
const router = new Router();

router.get('/',[
    validarJWT,
    rolADMIN,],getcarreras);

router.post('/',[
    validarJWT,
    rolADMIN,
    body('nombre').isLength({max : 100}).isString().notEmpty(),
    body('tipo','el tipo es maximo 3 letras o es necesario').notEmpty().isString().isLength({max : 3}),
    validarCampos,
    body('tipo').custom(validarTipo),
    validarCampos
],crearCarrera);

router.put('/',[
    validarJWT,
    rolADMIN,
    body('nombre','debe venir el nombre, o es muy largo').isLength({max : 100}).isString().notEmpty(),
    body('tipo','no debe ser vacio , o no mayor de 3 letrar').notEmpty().isString().isLength({max : 3}),
    body('tipo').custom(validarTipo),
    body('idcarrera',"id no valido o no esta").isInt().notEmpty(),
    body('idcarrera',).custom(existeCarrera),
    validarCampos],actuCarrera);




module.exports = router;