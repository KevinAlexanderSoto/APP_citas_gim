const {Router} = require('express');
const {check} = require('express-validator');

const {Getuser,
    Postuser,
    Putuser,
    Deleteuser} = require('../controllers/userController');

 const router = Router();

router.get('/',Getuser);

router.post('/',Postuser);

router.put('/',Putuser);

router.delete('/',Deleteuser);