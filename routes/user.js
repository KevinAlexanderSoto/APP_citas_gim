const {Router} = require('express');
const {check} = require('express-validator');

const router = Router();

const {Getuser,
    Postuser,
    Putuser,
    Deleteuser} = require('../controllers/userController');

 

//TODO: solo con perimiso De admin , devuelve todos los usuarios paginados 
router.get('/',Getuser);

router.post('/',Postuser);//TODO: crear nuevo usuario segun requerimiento de la DB 

router.put('/',Putuser);// TODO: actualizar datos como : CC , carrera , numero 

router.delete('/',Deleteuser);//TODO : PASAR A ESTADO INACTIVO 

module.exports = router;