const {Router, query} = require('express');
const {check, body} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const {Getuser,
    Postuser,
    Putuser,
    Deleteuser} = require('../controllers/userController');

const { existeNum, existeCarrera, existeEmail } = require('../helpers/validarCamposDB');
const {validarExisteRol} = require('../helpers/validarENUM');

//TODO: solo con perimiso De admin , devuelve todos los usuarios paginados 
router.get('/',[
    check('offset','tiene que ser un numero, entero').isInt(),
    check('limit','tiene que ser un numero, entero').isInt(),
    validarCampos
],Getuser);

//TODO: crear nuevo usuario ADMIN con token valido de otro ADMIN 
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


// TODO: actualizar datos como : CC , carrera , numero. VALIDAR USER CON JWT
router.put('/',[
    body('nombre','nombre no valido').default('noName').isString().isLength({max : 40}),
   body('numIdentidad','Valor no valido').default(00).isInt().isLength({max : 20}), 
   body('numIdentidad').default(00).custom(existeNum),
   body('tel','solo numeros').default(111).isInt(),
   body('carrera').default(0).custom(existeCarrera),
   body('carrera','la carrera se referencia con un numero').default(0).isInt(),
   
body('email','no es un correo valido').default('noemail@no.com').isLength({max : 80}).isEmail(),
body('email').default('noemail@no.com').custom(existeEmail),
check('rol','Rol no es valido , solo dos letras').default('no').isString().isLength({max : 2}),
check('rol').default('no').custom(validarExisteRol),
check('id','Falta el id a actualizar o no es valido').isInt().not().isEmpty(),
   validarCampos 
],Putuser); 

router.delete('/',Deleteuser);//TODO : PASAR A ESTADO INACTIVO , solo usuario ADMIN "AD"

module.exports = router;