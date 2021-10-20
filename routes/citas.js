const {Router} = require('express');
const {check,query, body} = require('express-validator');


const {Getcitas,
    Postcitas,
    Putcitas,
    Deletecitas,
    GetcitasAdmin} = require('../controllers/citasControllers');
const { validarJWT } = require('../helpers/GenValidatorJWT');
const { existeUsuario } = require('../helpers/validarCamposDB');
const { rolADMIN } = require('../middlewares/rolValido');
const { validarCampos } = require('../middlewares/validar-campos');

 const router = Router();

router.get('/',[
    validarJWT,
],Getcitas);

router.get('/ad',[
    validarJWT,
    rolADMIN,
    query('year','tiene que ser numero').default(2021).isInt(),
    query('month','tiene que ser numero').default(10).isInt(),
    query('day','tiene que ser numero').default(20).isInt(),
    validarCampos
],GetcitasAdmin);

router.post('/',[
    validarJWT,
    body('fecha','fecha no valida').isDate().not().isEmpty(),
    body('horaID','id de la hora no valida').isInt().isLength({max : 10}).not().isEmpty(),
    validarCampos
],Postcitas);

router.put('/',[
    validarJWT,
    rolADMIN,
    query('asis','quey no valido , asistencia en 1 o 0').isInt().isLength({max : 1}).notEmpty(),
    body('horaID','id de la hora no valida').default(000).isInt().isLength({max : 10}),
    body('data','numero identidad no valido o faltante ').isInt().not().isEmpty(),
    body('data').custom(existeUsuario),
    body('idcita',"id cita no valido o no esta").isInt().notEmpty(),
    validarCampos
],Putcitas);

router.delete('/',Deletecitas);

module.exports = router;