const {Router} = require('express');
const {check} = require('express-validator');


const {Getcitas,
    Postcitas,
    Putcitas,
    Deletecitas} = require('../controllers/citasControllers');

 const router = Router();

router.get('/',Getcitas);

router.post('/',Postcitas);

router.put('/',Putcitas);

router.delete('/',Deletecitas);

module.exports = router;