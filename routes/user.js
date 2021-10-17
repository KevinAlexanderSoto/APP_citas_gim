const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const {Getuser,
    Postuser,
    Putuser,
    Deleteuser} = require('../controllers/userController');

const { existeNum, existeCarrera, existeEmail } = require('../helpers/validarCamposDB');
const {validarExisteRol} = require('../helpers/validarENUM');

//TODO: solo con perimiso De admin , devuelve todos los usuarios paginados 
router.get('/',Getuser);

//TODO: crear nuevo usuario segun requerimiento de la DB 
router.post('/',[
check('nombre','nombre no valido').isString().isLength({max : 40}).not().isEmpty(),

check('numIdentidad','numero no valido').isInt().isLength({max : 20}).not().isEmpty(),

check('numIdentidad').custom(existeNum), 

check('password','tiene que ser mas de 6 y menor que 40 caracters').isLength({min : 6 , max: 40}).not().isEmpty(),

check('carrera','la carrera se ferencia por un numero').isInt(),

check('carrera').custom(existeCarrera),

check('email','no es un correo valido').isLength({max : 80}).isEmail().not().isEmpty(),

check('email').custom(existeEmail),

check('rol','Rol no es valido , solo dos letras').isString().isLength({max : 2}),

check('rol').custom(validarExisteRol),
validarCampos,
],Postuser);

router.put('/',Putuser);// TODO: actualizar datos como : CC , carrera , numero 

router.delete('/',Deleteuser);//TODO : PASAR A ESTADO INACTIVO 

module.exports = router;