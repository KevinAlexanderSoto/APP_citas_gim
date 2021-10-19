const {Router} = require('express');
const {check,query} = require('express-validator');


const {Getcitas,
    Postcitas,
    Putcitas,
    Deletecitas} = require('../controllers/citasControllers');
const { validarCampos } = require('../middlewares/validar-campos');

 const router = Router();

router.get('/',[
    query('year','tiene que ser numero').default(2021).isInt(),
    query('month','tiene que ser numero').default(10).isInt(),
    query('day','tiene que ser numero').default(20).isInt(),
    validarCampos
],Getcitas);

router.post('/',Postcitas);

router.put('/',Putcitas);

router.delete('/',Deletecitas);

module.exports = router;